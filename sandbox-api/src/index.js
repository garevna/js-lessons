/**
 * The practice backend for the js-lessons course.
 *
 * Glitch ended project hosting on 8 July 2025, taking five small servers with
 * it — garevna-rest-api, garevna-json-server, garevna-form-data,
 * json-server-with-router and garevna-chat — which twelve lessons send their
 * students to. The code was not recoverable; this is rebuilt from the requests
 * and the console output printed in the lessons themselves, so every response
 * matches what the text says the student will see.
 *
 * One Worker serves all of them, split by prefix:
 *
 *   /rest-api/…      users, keyed by id, with POST PUT PATCH DELETE
 *   /json-server/…   users and lessons as lists, json-server style
 *   /form-data/…     forms with an uploaded avatar, multipart in and out
 *
 * Nothing here needs a login. It is a sandbox a class writes into, and it is
 * meant to be thrown away and redeployed if it ever gets into a state.
 */

import { users, userList, lessons, forms } from './data.js'
import { Store, files } from './store.js'

const CORS = {
  // The lessons run from garevna.github.io and from whatever sandbox a student
  // is using — codepen, plnkr, a local file. There is nothing here worth
  // protecting and everything to gain from it answering all of them.
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
}

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS }
})

/**
 * REST.md asks for a number with ^18^ — "для передачи числа используем ^число^"
 * — because everything in a query string is a string otherwise and age would
 * never match.
 */
const value = (raw) => {
  const m = raw.match(/^\^(.*)\^$/)
  if (!m) return raw
  const n = Number(m[1])
  return Number.isNaN(n) ? m[1] : n
}

/** Every ?key=value pair has to match, and a key may repeat: ?name=A&name=B. */
const matches = (record, params) => {
  const wanted = new Map()
  for (const [key, raw] of params) {
    if (!wanted.has(key)) wanted.set(key, [])
    wanted.get(key).push(value(raw))
  }

  for (const [key, list] of wanted) {
    if (!list.some((v) => record[key] === v || String(record[key]) === String(v))) return false
  }
  return true
}

/* ------------------------------------------------------------- rest-api */

async function restApi (request, path, url, env) {
  const store = new Store(env.DB, 'user')

  // GET /users/all — the whole table, keyed by id
  if (path === '/users/all' && request.method === 'GET') {
    return json(await store.all(users))
  }

  // GET /users?name=Stephan  or  ?age=^18^ — a list of what matched
  if ((path === '/users' || path === '/users/') && request.method === 'GET') {
    const all = await store.all(users)
    const params = [...url.searchParams]
    const found = Object.values(all).filter((u) => !params.length || matches(u, params))
    return json(found)
  }

  const one = path.match(/^\/user\/([^/]+)\/?$/)
  if (!one) return json({ error: 404, message: `no route for ${path}` }, 404)

  const id = decodeURIComponent(one[1])
  const all = await store.all(users)
  const existing = all[id]

  switch (request.method) {
    case 'GET':
      return existing
        ? json(existing)
        : json({ error: 404, message: `${id} not found` }, 404)

    case 'POST': {
      // REST.md prints this exact refusal, spelling and all, for a POST over
      // something that is already there.
      if (existing) return json({ error: 475, message: `${id} allready exist` })
      const body = await request.json().catch(() => ({}))
      await store.put(id, body)
      return json(body)
    }

    case 'PUT': {
      const body = await request.json().catch(() => ({}))
      await store.put(id, body)
      return json(body)
    }

    case 'PATCH': {
      const body = await request.json().catch(() => ({}))
      const merged = { ...(existing || {}), ...body }
      await store.put(id, merged)
      return json(merged)
    }

    case 'DELETE':
      await store.remove(id)
      return new Response(null, { status: 200, headers: CORS })

    default:
      return json({ error: 405, message: `${request.method} not allowed here` }, 405)
  }
}

/* ---------------------------------------------------------- json-server */

async function jsonServer (request, path, url, env) {
  if (request.method !== 'GET') {
    return json({ error: 405, message: 'this one is read-only' }, 405)
  }

  if (path === '/users' || path === '/users/') {
    const params = [...url.searchParams]
    return json(userList.filter((u) => !params.length || matches(u, params)))
  }

  if (path === '/lessons' || path === '/lessons/') {
    const params = [...url.searchParams]
    return json(lessons.filter((l) => !params.length || matches(l, params)))
  }

  // throttling-and-debouncing.md types into a field and asks after every
  // keystroke, expecting {name: …} for a hit and something falsy otherwise.
  const login = path.match(/^\/usernames\/(.*)$/)
  if (login) {
    const wanted = decodeURIComponent(login[1]).toLowerCase()
    const found = userList.find((u) => u.name.toLowerCase() === wanted)
    return json(found ? { name: found.name } : null)
  }

  return json({ error: 404, message: `no route for ${path}` }, 404)
}

/* ----------------------------------------------------------- form-data */

// The fourth argument, not the third. Declared with three, this took url as
// its env, env.DB came back undefined, and the Worker quietly fell through to
// the in-memory store — so a form POST answered 200 and was never written.
// Nothing threw and nothing logged; the handler simply had no database.
async function formData (request, path, url, env) {
  const store = new Store(env.DB, 'form')

  if ((path === '/forms/all' || path === '/forms' || path === '/forms/') && request.method === 'GET') {
    const all = await store.all(forms)
    // FormData.md prints an avatar object beside the name and the age, so the
    // listing describes the file rather than carrying it.
    const described = {}
    for (const [login, record] of Object.entries(all)) {
      const file = await files.read(env.DB, login)
      described[login] = {
        ...record,
        avatar: file ? { name: file.name, type: file.type, size: (file.data.byteLength || file.data.length || 0) } : {}
      }
    }
    return json(described)
  }

  const read = path.match(/^\/forms\/([^/]+)\/?$/)
  if (read && request.method === 'GET') {
    const login = decodeURIComponent(read[1])
    const all = await store.all(forms)
    const record = all[login]
    if (!record) return json({ error: 404, message: `${login} not found` }, 404)

    // The lesson calls response.formData() on this, so it has to come back as
    // a form and not as JSON. Constructing a Response from FormData sets the
    // multipart content type and its boundary.
    const form = new FormData()
    form.set('name', String(record.name ?? ''))
    form.set('age', String(record.age ?? ''))

    const file = await files.read(env.DB, login)
    // D1 hands a BLOB back as an array of bytes, not as a buffer.
    if (file) form.set('avatar', new File([new Uint8Array(file.data)], file.name, { type: file.type }))

    const response = new Response(form)
    for (const [k, v] of Object.entries(CORS)) response.headers.set(k, v)
    return response
  }

  const write = path.match(/^\/form\/([^/]+)\/?$/)
  if (write && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const login = decodeURIComponent(write[1])
    const sent = await request.formData().catch(() => null)
    if (!sent) return json({ error: 400, message: 'expected multipart/form-data' }, 400)

    const all = await store.all(forms)
    const record = request.method === 'PATCH' ? { ...(all[login] || {}) } : {}

    for (const [key, field] of sent) {
      if (typeof field === 'string') { record[key] = field; continue }
      if (field.size) await files.write(env.DB, login, field)
    }

    await store.put(login, record)
    return new Response(null, { status: 200, headers: CORS })
  }

  return json({ error: 404, message: `no route for ${path}` }, 404)
}

/* ------------------------------------------------------------- routing */

const INDEX = `js-lessons sandbox API

  /rest-api/users/all            every user, keyed by id
  /rest-api/users?name=Stephan   a list of what matched
  /rest-api/users?age=^18^       ^…^ makes it a number, not a string
  /rest-api/user/<id>            GET POST PUT PATCH DELETE

  /json-server/users             a list
  /json-server/users?name=A&name=B
  /json-server/lessons           a list, with lesson and topic
  /json-server/usernames/<name>  {name} if there is one, null if not

  /form-data/forms/all           every form, with its avatar described
  /form-data/forms/<login>       multipart: name, age, avatar
  /form-data/form/<login>        POST PUT PATCH, multipart in

Anything written here is gone within a day. The records the lessons print
are always here.
`

export default {
  async fetch (request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    const url = new URL(request.url)

    for (const [prefix, handler] of [
      ['/rest-api', restApi],
      ['/json-server', jsonServer],
      ['/form-data', formData]
    ]) {
      if (url.pathname !== prefix && !url.pathname.startsWith(`${prefix}/`)) continue
      const path = url.pathname.slice(prefix.length) || '/'
      try {
        return await handler(request, path, url, env)
      } catch (error) {
        return json({ error: 500, message: error.message }, 500)
      }
    }

    return new Response(INDEX, {
      status: url.pathname === '/' ? 200 : 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', ...CORS }
    })
  }
}
