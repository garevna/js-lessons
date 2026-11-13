/**
 * Questions from the lessons, answered from a private Telegram channel.
 *
 * A reader asks something on a lesson page. The question lands in a channel
 * only Irina reads; she replies to it there, in Telegram, and the answer
 * appears under the question the next time the reader opens the site. There is
 * no admin panel, because an admin panel is where questions go unanswered.
 *
 * No accounts. The first question creates a thread and the browser keeps two
 * strings: a short public id, which is printed in Telegram so a thread can be
 * found months later, and a long token, which never leaves that browser and is
 * what makes reading the thread possible. Nobody registers, nobody confirms an
 * e-mail, and a reader who clears their storage simply starts a new thread -
 * the cost of that is one lost conversation, which is the right trade for a
 * site people arrive at to read one lesson.
 *
 * Routes:
 *   POST /feedback          a question; creates the thread if there is none
 *   GET  /feedback?…        the conversation so far
 *   POST /telegram          the webhook; a reply in the channel becomes an answer
 *   GET  /health            is it alive and configured
 */

import { createThread, openThread, addMessage, attachTelegramMessage, conversation, keepPostText, lastQuestion, messageById, messageByTelegramId, recentCount, remember, threadName } from './store.js'
import { answerButton, call, escape, inbox, isAdmin, markAnswered, post, questionText, readUpdate } from './telegram.js'

// The site is served from garevna.github.io and from js-lessons.pp.ua, and in
// development from a live-server on localhost. Listing them is not security -
// the browser enforces CORS, an attacker does not use a browser - it is a way
// of keeping the endpoint pointed at this course and out of other people's
// pages.
const ALLOWED = [
  'https://garevna.github.io',
  'https://js-lessons.pp.ua',
  'http://localhost:8080',
  'http://127.0.0.1:8080'
]

const MAX_TEXT = 4000      // a question, not an essay; Telegram caps a message at 4096
const MAX_NAME = 60
const MAX_PER_HOUR = 20

function cors (request) {
  const origin = request.headers.get('Origin') || ''
  const allowed = ALLOWED.includes(origin) ? origin : ALLOWED[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  }
}

const json = (request, body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(request) }
})

const trim = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : ''

/**
 * A line in the webhook's diary (see hook_events in schema.sql).
 *
 * Never throws and never changes the answer: a diagnostic that can break the
 * thing it watches is worse than no diagnostic.
 */
async function note (env, ok, kind, detail) {
  try {
    await env.DB.prepare('INSERT INTO hook_events (created, ok, kind, detail) VALUES (?, ?, ?, ?)')
      .bind(Date.now(), ok, kind, detail).run()
    await env.DB.prepare('DELETE FROM hook_events WHERE id <= (SELECT MAX(id) - 10 FROM hook_events)').run()
  } catch (error) {
    console.error('[feedback] note:', error.message)
  }
}

/* ------------------------------------------------------------- the reader */

async function ask (request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json(request, { error: 'expected JSON' }, 400)
  }

  const text = trim(body.text, MAX_TEXT)
  if (!text) return json(request, { error: 'empty' }, 400)

  const page = trim(body.page, 120)
  const lang = ['ua', 'ru', 'eng'].includes(body.lang) ? body.lang : null

  // An existing thread is continued only by whoever holds its token; anything
  // else starts a new one rather than failing, so a reader whose storage was
  // cleared still gets through.
  let thread = await openThread(env.DB, body.thread, body.token)
  const first = !thread
  if (!thread) {
    thread = await createThread(env.DB, { name: trim(body.name, MAX_NAME), page, lang })
  }

  if (await recentCount(env.DB, thread.id) >= MAX_PER_HOUR) {
    return json(request, { error: 'too-many' }, 429)
  }

  // Stored before it is posted: if Telegram is down, the question is still
  // kept and the reader is not told to write it again. The post is what may
  // fail, and the row carries no telegram id until it succeeds.
  const stored = await addMessage(env.DB, { thread: thread.id, side: 'reader', text, page })

  try {
    const postText = questionText({
      thread: thread.id,
      name: thread.name,
      page,
      lang: lang || thread.lang,
      text,
      first
    })
    // The button carries this message's row id, so an answer is tied to the
    // question it answers and not to whatever was replied to.
    const messageId = await post(env, await inbox(env, env.DB), postText, answerButton(stored.id))
    await attachTelegramMessage(env.DB, stored.id, messageId)
    await keepPostText(env.DB, stored.id, postText)
  } catch (error) {
    console.error('[feedback] telegram:', error.message)
    return json(request, {
      thread: thread.id,
      token: thread.token,
      id: stored.id,
      delivered: false,
      // What Telegram said, passed through: "chat not found" when the bot is
      // not an administrator of the channel, "unauthorized" when the token is
      // wrong. None of it reveals anything - the token is never in the
      // message - and without it the only way to see why nothing arrives is
      // to sit on `wrangler tail` and hope the stream flushes.
      reason: error.message
    }, 202)
  }

  return json(request, { thread: thread.id, token: thread.token, id: stored.id, delivered: true })
}

async function read (request, env, url) {
  const thread = await openThread(env.DB, url.searchParams.get('thread'), url.searchParams.get('token'))
  if (!thread) return json(request, { error: 'no-thread' }, 404)

  const questions = await conversation(env.DB, thread.id)
  return json(request, {
    thread: thread.id,
    name: thread.name,
    // Each question carries its own answers. `answers` is what the page puts
    // a badge on: how many of them the reader has not seen yet is its own
    // business, kept in the browser beside the thread id.
    questions,
    answers: questions.reduce((total, question) => total + question.replies.length, 0)
  })
}

/* ------------------------------------------------------------- the author */

/**
 * The three ways an answer can arrive, and the one way it is saved.
 *
 * 1. "✍️ Ответить" under a post in the channel. A channel has no reply field
 *    in most Telegram clients, so the bot writes to the admin privately and
 *    asks for the answer there.
 * 2. The admin's reply to that private request.
 * 3. A plain reply to the post, for whoever has a client that offers one.
 *
 * All three end in deliver(), which stores the answer for the reader and -
 * the point of the whole arrangement - edits the post in the channel so its
 * ⚠️ becomes ✅. With fifty questions in a channel, that mark is the only
 * thing that says which of them are still waiting.
 */

/** The prompt carries both ids, so no state has to be kept between taps. */
const PROMPT_IDS = /🆔\s*(\d+)\s*·\s*#(\d+)/

async function deliver (env, message, text) {
  // parent: the answer belongs to the question it answers, so the page can
  // show it under that question and not at the end of a flat log. A question
  // may collect several.
  await addMessage(env.DB, { thread: message.thread_id, side: 'author', text, parent: message.id })

  let marked = false
  if (message.tg_message_id && message.tg_text) {
    const updated = await markAnswered(env, await inbox(env, env.DB), {
      postId: message.tg_message_id,
      postText: message.tg_text,
      answer: text,
      name: await threadName(env.DB, message.thread_id),
      markup: answerButton(message.id)
    })
    await keepPostText(env.DB, message.id, updated)
    marked = true
  }
  return { thread: message.thread_id, marked }
}

/**
 * The answer as written is now inside the question's own post, so the typed
 * message is a duplicate - and a chat of duplicates is the thing this whole
 * arrangement exists to avoid. It goes.
 *
 * Only when the post really was updated: if the mark did not go on, the
 * typed message is the only copy of the answer and deleting it would throw
 * the answer away. And only when the bot is allowed to - deleting someone
 * else's message needs the right, so a refusal falls back to a 👍, which at
 * least says the answer went through.
 */
async function tidyAway (env, post, marked) {
  if (!marked) return
  const removed = await call(env, 'deleteMessage', { chat_id: post.chat.id, message_id: post.message_id })
  if (!removed.ok) {
    await call(env, 'setMessageReaction', {
      chat_id: post.chat.id,
      message_id: post.message_id,
      reaction: [{ type: 'emoji', emoji: '👍' }]
    })
  }
}

/** 1. The button. */
async function onAnswerButton (env, callback) {
  const id = Number(String(callback.data || '').slice(2))
  const message = id ? await messageById(env.DB, id) : null

  if (!message || !(await isAdmin(env, await inbox(env, env.DB), callback.from.id))) {
    await call(env, 'answerCallbackQuery', {
      callback_query_id: callback.id,
      text: 'Отвечать могут только администраторы канала.',
      show_alert: true
    })
    return 'button refused'
  }

  // In a group the reply field is right there, in every Telegram client, so
  // the answer is written under the post and nobody switches chats. Only a
  // channel has no reply field - that, and nothing else, is why the bot
  // takes the conversation into a private chat.
  const where = callback.message && callback.message.chat && callback.message.chat.type
  if (where === 'group' || where === 'supergroup') {
    // force_reply opens the reply field in the admin's client by itself,
    // already tied to this prompt - so answering is: tap the button, type,
    // send. No reply gesture, no switching chats. The prompt carries both
    // ids, so nothing has to be remembered between the tap and the answer,
    // and it is deleted as soon as the answer arrives.
    const asked = await call(env, 'sendMessage', {
      chat_id: callback.message.chat.id,
      reply_parameters: { message_id: callback.message.message_id, allow_sending_without_reply: true },
      text: `✍️ Ответ${message.page ? ` · ${escape(message.page)}` : ''}
🆔 ${message.id} · #${message.tg_message_id}`,
      parse_mode: 'HTML',
      reply_markup: { force_reply: true, input_field_placeholder: 'Ваш ответ…' }
    })
    await call(env, 'answerCallbackQuery', {
      callback_query_id: callback.id,
      text: asked.ok ? 'Пишите ответ — поле уже открыто.' : 'Не вышло открыть поле ответа.'
    })
    return asked.ok ? `prompt opened in the group for message ${message.id}` : 'could not open the prompt'
  }

  const quoted = String(message.text || '').slice(0, 600)
  const asked = await call(env, 'sendMessage', {
    chat_id: callback.from.id,
    text: `✍️ Ответ на вопрос из урока <b>${escape(message.page || 'сайт')}</b>:

`
      + `<blockquote>${escape(quoted)}</blockquote>
`
      + `🆔 ${message.id} · #${message.tg_message_id}

`
      + 'Напишите ответ ответом на это сообщение.',
    parse_mode: 'HTML',
    reply_markup: { force_reply: true, input_field_placeholder: 'Ваш ответ…' }
  })

  await call(env, 'answerCallbackQuery', asked.ok
    ? { callback_query_id: callback.id, text: 'Напишите ответ в чате с ботом.' }
    // A bot may write first only to someone who has started it.
    : { callback_query_id: callback.id, text: 'Сначала откройте чат с ботом и нажмите «Start», потом попробуйте снова.', show_alert: true })

  return asked.ok ? `asked for an answer to message ${message.id}` : 'bot cannot write to this admin yet'
}

/** 2. The admin's reply in the private chat. */
async function onPrivateAnswer (env, update, text) {
  const ids = PROMPT_IDS.exec(update.replyTo.text || '')
  if (!ids) return 'private message that answers no prompt'
  if (!(await isAdmin(env, await inbox(env, env.DB), update.post.from.id))) return 'not an admin'

  const message = await messageById(env.DB, ids[1])
  if (!message) return `prompt points at message ${ids[1]}, which is gone`

  const { thread } = await deliver(env, message, text)
  await call(env, 'sendMessage', { chat_id: update.post.chat.id, text: '✅ Отправлено — читатель увидит ответ на странице урока.' })
  return `answer stored in thread ${thread}`
}

/**
 * 3. An answer written in the channel itself.
 *
 * Two shapes, because Telegram gives channels no reliable reply: a real
 * reply to the post, and - when the client sends a quote instead, which is
 * what actually happens - a post that begins with the thread id. The id is
 * printed in every question as code, so one tap copies it.
 */
const THREAD_IN_TEXT = /^\s*(?:тред\s*)?([0-9a-f]{8})[\s:,.—-]*/i

async function onChannelAnswer (env, update, text) {
  if (update.post.from && !(await isAdmin(env, await inbox(env, env.DB), update.post.from.id))) return 'not an admin'

  if (update.replyTo) {
    // Two things can be replied to: the bot's "✍️ Ответ 🆔 … · #…" prompt,
    // which the button opens, or the question itself.
    const prompted = PROMPT_IDS.exec(update.replyTo.text || '')
    const message = prompted
      ? await messageById(env.DB, prompted[1])
      : await messageByTelegramId(env.DB, update.replyTo.message_id)

    if (!message) return `reply to message ${update.replyTo.message_id}, which belongs to no question`

    const { thread, marked } = await deliver(env, message, text)
    if (prompted) {
      // The prompt has done its work; leaving it would litter the group with
      // one of these under every answered question.
      await call(env, 'deleteMessage', { chat_id: update.post.chat.id, message_id: update.replyTo.message_id })
    }
    await tidyAway(env, update.post, marked)
    return `answer stored in thread ${thread}`
  }

  const found = THREAD_IN_TEXT.exec(text)
  if (!found) return 'a post in the channel that answers nothing (no reply, no thread id)'

  const message = await lastQuestion(env.DB, found[1].toLowerCase())
  if (!message) return `thread ${found[1]} has no question to answer`

  const answer = text.slice(found[0].length).trim()
  if (!answer) return `thread ${found[1]} named, but the post says nothing else`

  const { thread, marked } = await deliver(env, message, answer)
  await tidyAway(env, update.post, marked)
  return `answer stored in thread ${thread}`
}

/**
 * "/here" - move the inbox to this chat.
 *
 * Who may: an administrator of the chat the questions go to now. That is the
 * whole guard, and it is enough - anyone can add a bot to their own group,
 * and without this they could point somebody else's questions at it.
 */
async function onHere (env, update) {
  const chat = update.post.chat
  const user = update.post.from && update.post.from.id
  if (!user) {
    await call(env, 'sendMessage', { chat_id: chat.id, text: 'Эту команду нужно написать в группе — в канале у сообщений нет автора, и я не могу проверить, кто это.' })
    return 'here: no author (channel post)'
  }

  const current = await inbox(env, env.DB)
  if (current && String(current) !== String(chat.id) && !(await isAdmin(env, current, user))) {
    await call(env, 'sendMessage', { chat_id: chat.id, text: 'Перенести ящик может только администратор того чата, куда вопросы приходят сейчас.' })
    return `here: ${user} is not an admin of ${current}`
  }

  await remember(env.DB, 'inbox_chat', chat.id)
  await call(env, 'sendMessage', {
    chat_id: chat.id,
    text: '📬 Готово: вопросы с сайта теперь приходят сюда. Отвечайте реплаем на сообщение — ответ уйдёт читателю, а ⚠️ сменится на ✅.'
  })
  return `inbox moved to ${chat.id}`
}

/**
 * Telegram calls this. Nobody else should be able to.
 *
 * setWebhook was given a secret_token, which Telegram returns in a header on
 * every call; without that check the address alone would be the only thing
 * standing between a stranger and the ability to answer in Irina's name.
 *
 * The answer is always 200, whatever happens inside: anything else makes
 * Telegram retry the same update for a day. What became of it is written to
 * hook_events instead.
 */
async function webhook (request, env) {
  if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== String(env.TELEGRAM_WEBHOOK_SECRET || '').trim()) {
    await note(env, 0, 'rejected', 'secret header did not match')
    return new Response('no', { status: 401 })
  }

  let update
  try {
    update = await request.json()
  } catch {
    await note(env, 1, 'unparsed', 'body was not JSON')
    return new Response('ok')
  }

  const kind = Object.keys(update).filter((key) => key !== 'update_id').join(',') || 'empty'

  try {
    if (update.callback_query) {
      await note(env, 1, 'callback_query', await onAnswerButton(env, update.callback_query))
      return new Response('ok')
    }

    const seen = readUpdate(update)
    if (!seen || !seen.text) {
      await note(env, 1, kind, 'nothing to read in it')
      return new Response('ok')
    }

    if (/^\/here(@\w+)?\s*$/.test(seen.text.trim())) {
      await note(env, 1, kind, await onHere(env, seen))
      return new Response('ok')
    }

    if (seen.private) {
      await note(env, 1, kind, seen.replyTo
        ? await onPrivateAnswer(env, seen, seen.text)
        : 'private message out of the blue')
      return new Response('ok')
    }

    await note(env, 1, kind, await onChannelAnswer(env, seen, seen.text))
  } catch (error) {
    console.error('[feedback] webhook:', error.message)
    await note(env, 1, kind, `failed: ${error.message}`)
  }

  return new Response('ok')
}

export default {
  async fetch (request, env) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) })

    if (path === '/telegram' && request.method === 'POST') return webhook(request, env)

    if (path === '/feedback' && request.method === 'POST') return ask(request, env)
    if (path === '/feedback' && request.method === 'GET') return read(request, env, url)

    if (path === '/health') {
      return json(request, {
        ok: true,
        // Says what is missing without ever saying what any of it is.
        configured: {
          db: Boolean(env.DB),
          token: Boolean(env.TELEGRAM_BOT_TOKEN),
          channel: Boolean(env.TELEGRAM_CHAT_ID),
          webhookSecret: Boolean(env.TELEGRAM_WEBHOOK_SECRET)
        }
      })
    }

    return json(request, { error: 'not-found' }, 404)
  }
}
