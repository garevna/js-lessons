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

/** The question a post in the channel belongs to, with the post's text. */
export async function messageByTelegramId (db, telegramMessageId) {
  return db.prepare(
    'SELECT * FROM messages WHERE tg_message_id = ? ORDER BY id DESC LIMIT 1'
  ).bind(telegramMessageId).first()
}

export async function messageById (db, id) {
  return db.prepare('SELECT * FROM messages WHERE id = ?').bind(Number(id) || 0).first()
}

/**
 * The post's text as it now stands in Telegram.
 *
 * Kept because editing a message means sending the whole of it again: to add
 * "🤝 answer" to a post you have to know what is already in it, and Telegram
 * will not tell you.
 */
export async function keepPostText (db, id, text) {
  await db.prepare('UPDATE messages SET tg_text = ? WHERE id = ?').bind(text, id).run()
}

/** The name the thread's reader gave, for the answer's header. */
export async function threadName (db, thread) {
  const row = await db.prepare('SELECT name FROM threads WHERE id = ?').bind(thread).first()
  return row ? row.name : null
}

export async function addMessage (db, { thread, side, text, page, parent = null, telegramMessageId = null }) {
  const time = now()
  const result = await db.prepare(
    'INSERT INTO messages (thread_id, parent_id, side, text, page, created, tg_message_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(thread, parent, side, text, page || null, time, telegramMessageId).run()

  await db.prepare('UPDATE threads SET updated = ? WHERE id = ?').bind(time, thread).run()
  return { id: result.meta.last_row_id, created: time }
}

/** Fills in the Telegram id once the post has actually been made. */
export async function attachTelegramMessage (db, id, telegramMessageId) {
  await db.prepare('UPDATE messages SET tg_message_id = ? WHERE id = ?').bind(telegramMessageId, id).run()
}

/**
 * The conversation: questions oldest first, each with the answers attached
 * to it.
 *
 * Nested rather than flat, because that is how it is read. A flat log of
 * twenty messages is a thicket - you cannot see what answers what - while a
 * question with its answers under it stays legible however many there are.
 * The whole thread comes back on every call: a reader's thread is a handful
 * of rows, and paging it would cost more than it saves.
 */
export async function conversation (db, thread) {
  const { results } = await db.prepare(
    'SELECT id, parent_id, side, text, page, created FROM messages WHERE thread_id = ? ORDER BY id'
  ).bind(thread).all()

  const rows = results || []
  const questions = []
  const byId = new Map()

  for (const row of rows) {
    if (row.side === 'reader') {
      const question = { id: row.id, text: row.text, page: row.page, created: row.created, replies: [] }
      byId.set(row.id, question)
      questions.push(question)
    }
  }

  for (const row of rows) {
    if (row.side !== 'author') continue
    const reply = { id: row.id, text: row.text, created: row.created }
    // An answer with no parent is one from before answers had parents, or a
    // reply to a question that has since gone: it belongs to the last
    // question rather than nowhere.
    const question = byId.get(row.parent_id) || questions[questions.length - 1]
    if (question) question.replies.push(reply)
  }

  return questions
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

/**
 * The newest question in a thread - what an answer that names only the
 * thread is answering.
 */
export async function lastQuestion (db, thread) {
  return db.prepare(
    "SELECT * FROM messages WHERE thread_id = ? AND side = 'reader' ORDER BY id DESC LIMIT 1"
  ).bind(thread).first()
}

/**
 * Settings that outlive a deployment - at the moment one: which chat the
 * questions go to.
 *
 * In wrangler.toml it would be a redeploy every time the inbox moves, and
 * moving it is exactly the kind of thing that happens on a Tuesday evening.
 */
export async function setting (db, key, fallback = null) {
  const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first()
  return row ? row.value : fallback
}

export async function remember (db, key, value) {
  await db.prepare(
    'INSERT INTO settings (key, value, updated) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated = excluded.updated'
  ).bind(key, String(value), now()).run()
}
