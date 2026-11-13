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

import { createThread, openThread, addMessage, attachTelegramMessage, messages, recentCount, threadByTelegramMessage } from './store.js'
import { post, questionText, readUpdate } from './telegram.js'

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
    const messageId = await post(env, questionText({
      thread: thread.id,
      name: thread.name,
      page,
      lang: lang || thread.lang,
      text,
      first
    }))
    await attachTelegramMessage(env.DB, stored.id, messageId)
  } catch (error) {
    console.error('[feedback] telegram:', error.message)
    return json(request, {
      thread: thread.id,
      token: thread.token,
      id: stored.id,
      delivered: false
    }, 202)
  }

  return json(request, { thread: thread.id, token: thread.token, id: stored.id, delivered: true })
}

async function read (request, env, url) {
  const thread = await openThread(env.DB, url.searchParams.get('thread'), url.searchParams.get('token'))
  if (!thread) return json(request, { error: 'no-thread' }, 404)

  return json(request, {
    thread: thread.id,
    name: thread.name,
    messages: await messages(env.DB, thread.id, url.searchParams.get('since'))
  })
}

/* ------------------------------------------------------------- the author */

/**
 * Telegram calls this. Nobody else should be able to.
 *
 * setWebhook was given a secret_token, which Telegram returns in a header on
 * every call; without that check the address alone would be the only thing
 * standing between a stranger and the ability to answer in Irina's name.
 */
async function webhook (request, env) {
  if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response('no', { status: 401 })
  }

  let update
  try {
    update = await request.json()
  } catch {
    return new Response('ok')
  }

  const reply = readUpdate(update)
  // Always 200: an update Telegram cannot deliver is retried, and a post in
  // the channel that answers nothing is not an error, it is a note to self.
  if (!reply) return new Response('ok')

  const thread = await threadByTelegramMessage(env.DB, reply.replyTo)
  if (!thread) return new Response('ok')

  await addMessage(env.DB, {
    thread,
    side: 'author',
    text: reply.text,
    telegramMessageId: reply.messageId
  })

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
