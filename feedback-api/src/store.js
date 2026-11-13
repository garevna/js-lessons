/**
 * Everything this Worker keeps, which is two tables (see schema.sql).
 *
 * D1 rather than KV for the same reason the sandbox uses it: a reader sends a
 * question and the page shows it immediately afterwards. KV is eventually
 * consistent and would show an empty thread for a minute.
 */

const now = () => Date.now()

/** Short, readable, said out loud over a call if need be: 8 hex characters. */
const shortId = () => crypto.randomUUID().replace(/-/g, '').slice(0, 8)

/** Long enough that guessing is not a strategy: 32 hex characters. */
const secret = () => crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '').slice(0, 16)

export async function createThread (db, { name, page, lang }) {
  const thread = { id: shortId(), token: secret(), name: name || null, page: page || null, lang: lang || null }
  const time = now()
  await db.prepare(
    'INSERT INTO threads (id, token, name, page, lang, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(thread.id, thread.token, thread.name, thread.page, thread.lang, time, time).run()
  return thread
}

/**
 * The thread, if the token matches it.
 *
 * The id alone is not enough on purpose: ids are short and appear in Telegram,
 * tokens are long and live only in the reader's browser.
 */
export async function openThread (db, id, token) {
  if (!id || !token) return null
  const row = await db.prepare('SELECT * FROM threads WHERE id = ?').bind(id).first()
  if (!row || row.token !== token) return null
  return row
}

export async function threadByTelegramMessage (db, messageId) {
  const row = await db.prepare(
    'SELECT thread_id FROM messages WHERE tg_message_id = ? ORDER BY id DESC LIMIT 1'
  ).bind(messageId).first()
  return row ? row.thread_id : null
}

export async function addMessage (db, { thread, side, text, page, telegramMessageId = null }) {
  const time = now()
  const result = await db.prepare(
    'INSERT INTO messages (thread_id, side, text, page, created, tg_message_id) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(thread, side, text, page || null, time, telegramMessageId).run()

  await db.prepare('UPDATE threads SET updated = ? WHERE id = ?').bind(time, thread).run()
  return { id: result.meta.last_row_id, created: time }
}

/** Fills in the Telegram id once the post has actually been made. */
export async function attachTelegramMessage (db, id, telegramMessageId) {
  await db.prepare('UPDATE messages SET tg_message_id = ? WHERE id = ?').bind(telegramMessageId, id).run()
}

/**
 * The conversation, oldest first. `since` is the id of the last message the
 * page already shows, so polling asks for what it has not seen.
 */
export async function messages (db, thread, since = 0) {
  const { results } = await db.prepare(
    'SELECT id, side, text, page, created FROM messages WHERE thread_id = ? AND id > ? ORDER BY id'
  ).bind(thread, Number(since) || 0).all()
  return results || []
}

/**
 * How many questions this thread has sent in the last hour.
 *
 * The only brake here. There is no login to rate-limit by and no captcha in
 * front of the form, so a thread that is clearly hammering is stopped and
 * everything else is left alone.
 */
export async function recentCount (db, thread) {
  const row = await db.prepare(
    "SELECT COUNT(*) AS n FROM messages WHERE thread_id = ? AND side = 'reader' AND created > ?"
  ).bind(thread, now() - 3600_000).first()
  return row ? row.n : 0
}
