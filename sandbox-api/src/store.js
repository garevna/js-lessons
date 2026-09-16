/**
 * Where the students' writes go.
 *
 * The lessons POST a user and read it back on the next line, so a write has to
 * be visible immediately. That one requirement decides the storage, and it
 * ruled out the obvious choice: KV is eventually consistent, and measured
 * against the deployed Worker a POST took about a minute to appear — 0 of 6
 * reads found it at once, 0 of 6 after twenty seconds, 6 of 6 after
 * sixty-five. D1 answers from its primary and is consistent straight away.
 *
 * When no database is bound the writes go to a plain object instead, so the
 * Worker still answers on a machine with no account attached — but that is for
 * running the tests, not for a class: it is per-isolate, and deployed that way
 * a POST and a GET landed in different isolates and disagreed.
 *
 * Anything a student writes expires after a day. This is a sandbox a whole
 * class writes into, and the one on Glitch slowly filled with test records
 * until the lesson's own data was hard to find among them. The seed records
 * the lessons print never expire.
 */

const DAY = 60 * 60 * 24

const memory = new Map()
const now = () => Math.floor(Date.now() / 1000)

export class Store {
  constructor (db, collection) {
    this.db = db || null
    this.collection = collection
  }

  key (id) {
    return `${this.collection}:${id}`
  }

  async get (id) {
    if (!this.db) {
      const found = memory.get(this.key(id))
      return found === undefined ? null : found
    }

    const row = await this.db
      .prepare('SELECT value FROM records WHERE collection = ? AND id = ? AND (expires IS NULL OR expires > ?)')
      .bind(this.collection, id, now())
      .first()

    if (!row) return undefined          // never written
    return row.value === null ? null : JSON.parse(row.value)
  }

  async put (id, value, { permanent = false } = {}) {
    if (!this.db) { memory.set(this.key(id), value); return }

    await this.db
      .prepare('INSERT INTO records (collection, id, value, expires) VALUES (?, ?, ?, ?)' +
               ' ON CONFLICT (collection, id) DO UPDATE SET value = excluded.value, expires = excluded.expires')
      .bind(this.collection, id, value === null ? null : JSON.stringify(value), permanent ? null : now() + DAY)
      .run()
  }

  /** A delete has to outlive the seed, so it is recorded rather than removed. */
  async remove (id) {
    await this.put(id, null)
  }

  /** Seed values first, then whatever has been written over or added. */
  async all (seed) {
    const result = { ...seed }

    if (!this.db) {
      for (const [name, value] of memory) {
        if (!name.startsWith(`${this.collection}:`)) continue
        const id = name.slice(this.collection.length + 1)
        if (value === null) delete result[id]
        else result[id] = value
      }
      return result
    }

    const { results } = await this.db
      .prepare('SELECT id, value FROM records WHERE collection = ? AND (expires IS NULL OR expires > ?)')
      .bind(this.collection, now())
      .all()

    for (const row of results) {
      if (row.value === null) delete result[row.id]
      else result[row.id] = JSON.parse(row.value)
    }

    return result
  }
}

/** The avatar the FormData lesson uploads and reads back as part of a form. */
export const files = {
  async read (db, login) {
    if (!db) return memory.get(`file:${login}`) || null

    const row = await db
      .prepare('SELECT name, type, data FROM files WHERE login = ? AND (expires IS NULL OR expires > ?)')
      .bind(login, now())
      .first()

    return row ? { name: row.name, type: row.type, data: row.data } : null
  },

  async write (db, login, file) {
    const record = {
      name: file.name,
      type: file.type || 'application/octet-stream',
      data: await file.arrayBuffer()
    }

    if (!db) { memory.set(`file:${login}`, record); return }

    await db
      .prepare('INSERT INTO files (login, name, type, data, expires) VALUES (?, ?, ?, ?, ?)' +
               ' ON CONFLICT (login) DO UPDATE SET name = excluded.name, type = excluded.type,' +
               ' data = excluded.data, expires = excluded.expires')
      .bind(login, record.name, record.type, [...new Uint8Array(record.data)], now() + DAY)
      .run()
  }
}
