/**
 * Where the students' writes go.
 *
 * The lessons POST a user and then GET it back, so writes have to survive the
 * round trip. Two things make that awkward on a free Worker, and both are
 * handled here rather than in the route code.
 *
 * A KV namespace is used when one is bound, and a plain object when it is not,
 * so the Worker answers correctly the moment it is deployed and gets shared,
 * durable storage as soon as a namespace is added. Without KV a write is
 * visible only to the isolate that took it, which is usually the same one a
 * moment later and occasionally is not.
 *
 * Anything a student writes expires after a day. This is a sandbox a whole
 * class writes into, and the old one on Glitch slowly filled with test records
 * until nobody could tell the lesson's data from the noise. The seed records
 * the lessons print never expire.
 */

const DAY = 60 * 60 * 24

const memory = new Map()

export class Store {
  constructor (kv, prefix) {
    this.kv = kv || null
    this.prefix = prefix
  }

  key (id) {
    return `${this.prefix}:${id}`
  }

  async get (id) {
    if (this.kv) return await this.kv.get(this.key(id), 'json')
    const found = memory.get(this.key(id))
    return found === undefined ? null : found
  }

  async put (id, value, { permanent = false } = {}) {
    if (this.kv) {
      await this.kv.put(this.key(id), JSON.stringify(value), permanent ? {} : { expirationTtl: DAY })
      return
    }
    memory.set(this.key(id), value)
  }

  async delete (id) {
    if (this.kv) { await this.kv.delete(this.key(id)); return }
    memory.delete(this.key(id))
  }

  /** Seed values first, then whatever has been written over or added. */
  async all (seed) {
    const result = { ...seed }

    if (this.kv) {
      // A class of thirty writes a handful of records; one page is plenty, and
      // list() costs one read whatever it returns.
      const { keys } = await this.kv.list({ prefix: `${this.prefix}:` })
      for (const { name } of keys) {
        const id = name.slice(this.prefix.length + 1)
        const value = await this.kv.get(name, 'json')
        if (value === null) delete result[id]
        else result[id] = value
      }
      return result
    }

    for (const [name, value] of memory) {
      if (!name.startsWith(`${this.prefix}:`)) continue
      const id = name.slice(this.prefix.length + 1)
      if (value === null) delete result[id]
      else result[id] = value
    }
    return result
  }

  /** A delete has to outlive the seed, so it is recorded rather than removed. */
  async remove (id) {
    await this.put(id, null)
  }
}
