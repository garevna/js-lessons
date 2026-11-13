/**
 * The Telegram side: posting a question into the private channel, asking for
 * an answer, and marking the post once it has one.
 *
 * The scheme is the one the Pagewright relay uses, because it is the one that
 * survived contact with a real inbox: every question is posted with a ⚠️ and
 * a button under it, and when it is answered the same post is edited - ⚠️
 * becomes ✅ and the answer is written into it. With fifty questions in the
 * channel you see at a glance which ones are still waiting, which is what a
 * plain reply can never show.
 *
 * The bot token never appears here. It is a Worker secret (wrangler secret
 * put TELEGRAM_BOT_TOKEN), so it exists in Cloudflare and nowhere in this
 * repository.
 */

import { setting } from './store.js'

const API = 'https://api.telegram.org/bot'

/** Unanswered, and answered. The variation selector is part of the emoji. */
export const WAITING = '⚠️'
export const ANSWERED = '✅'

/** Drawn between a question and the answers to it. */
export const RULE = '──────────'

/** Telegram's HTML mode is strict about these three and forgiving about the rest. */
export const escape = (text) => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

/**
 * Where the questions go.
 *
 * wrangler.toml holds the first one; after that it is whatever chat was last
 * told "/here", kept in the settings table. Moving the inbox should be a
 * message in Telegram, not an edit and a deploy.
 */
export async function inbox (env, db) {
  return String(await setting(db, 'inbox_chat', env.TELEGRAM_CHAT_ID || '')).trim()
}

/**
 * One call to the bot API. Returns Telegram's own answer, parsed; nothing is
 * thrown, because every caller here has something better to do with a refusal
 * than crash - usually showing it to whoever caused it.
 */
export async function call (env, method, payload) {
  try {
    const response = await fetch(`${API}${env.TELEGRAM_BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return await response.json()
  } catch (error) {
    return { ok: false, description: error.message }
  }
}

/**
 * One question, as it appears in the channel.
 *
 * The header is what makes answering possible months later: which lesson, in
 * which language, from which thread. The thread id is printed because a post
 * can be forwarded or quoted - the id in the text is the copy that survives.
 */
export function questionText ({ status = WAITING, thread, name, telegram, page, lang, text, first }) {
  const who = name ? escape(name) : 'без имени'
  // A handle becomes a link, so answering in private is one tap rather than
  // a copy, a search, and a hope that it is the same person.
  const handle = telegram ? ` · <a href="https://t.me/${escape(telegram)}">@${escape(telegram)}</a>` : ''
  return [
    `${status} <b>${escape(page || 'сайт')}</b> · ${escape(lang || '?')}`,
    `${who}${handle} · тред <code>${escape(thread)}</code>${first ? ' · новый' : ''}`,
    '',
    escape(text)
  ].join('\n')
}

/** The button under a question. `id` is the message's row id in D1. */
export const answerButton = (id) => ({
  inline_keyboard: [[{ text: '✍️ Ответить', callback_data: `r|${id}` }]]
})

/**
 * Posts a question and returns the id Telegram gave it, or throws with
 * Telegram's own reason - "chat not found" when the bot is not an
 * administrator of the channel, "Unauthorized" when the token is wrong.
 */
export async function post (env, chat, text, markup) {
  const answer = await call(env, 'sendMessage', {
    chat_id: chat,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    ...(markup ? { reply_markup: markup } : {})
  })
  if (!answer.ok) throw new Error(`telegram sendMessage: ${answer.description || 'unknown'}`)
  return answer.result.message_id
}

/**
 * The post, rewritten with the answer in it: ⚠️ becomes ✅ and the answer is
 * added as a paragraph. The button is kept, so a second answer is one tap
 * away.
 *
 * Telegram caps a message at 4096 characters. Past that the answer goes under
 * the post as its own message instead, and the post is still marked answered.
 */
export async function markAnswered (env, chat, { postId, postText, answer, name, markup }) {
  const time = new Date().toLocaleTimeString('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit' })
  const marked = postText.startsWith(WAITING) ? ANSWERED + postText.slice(WAITING.length) : postText
  // A rule between the question and the answers to it, drawn once: without
  // it the first answer reads as a continuation of the question. Further
  // answers line up under the same rule.
  const head = marked.includes(RULE) ? marked : `${marked}\n\n${RULE}`
  const text = `${head}\n\n🤝 ${time} · ${escape(answer)}`

  if (text.length <= 4096) {
    const edited = await call(env, 'editMessageText', {
      chat_id: chat,
      message_id: postId,
      text,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
      ...(markup ? { reply_markup: markup } : {})
    })
    if (edited.ok) return text
  }

  // Too long, or the edit was refused: the mark still has to go on, and the
  // answer still has to be visible in the channel.
  await call(env, 'editMessageText', {
    chat_id: chat,
    message_id: postId,
    text: head,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    ...(markup ? { reply_markup: markup } : {})
  })
  await call(env, 'sendMessage', {
    chat_id: chat,
    reply_parameters: { message_id: postId, allow_sending_without_reply: true },
    text: `🤝 Ответ${name ? ` для ${escape(name)}` : ''}\n\n${escape(answer)}`,
    parse_mode: 'HTML'
  })
  return head
}

/** Only an administrator of the channel may answer in Irina's name. */
export async function isAdmin (env, chat, userId) {
  const answer = await call(env, 'getChatMember', { chat_id: chat, user_id: userId })
  return ['creator', 'administrator'].includes(answer?.result?.status)
}

/**
 * An update as it arrives on the webhook, reduced to what matters.
 *
 * A channel admin writing in the channel produces channel_post; the same bot
 * in a group or a private chat produces message. Both are accepted, because a
 * private channel can be turned into a group later and nothing here should
 * care.
 */
export function readUpdate (update) {
  const post = update.channel_post || update.message || update.edited_channel_post || update.edited_message
  if (!post) return null

  return {
    post,
    text: post.text || post.caption || '',
    replyTo: post.reply_to_message || null,
    private: post.chat && post.chat.type === 'private'
  }
}
