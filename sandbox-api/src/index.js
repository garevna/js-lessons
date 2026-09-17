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
import { chat } from './chat.js'
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


/* ---------------------------------------------------------------- chat */

/**
 * A face for a chat user, drawn rather than fetched.
 *
 * The originals were on cdn.glitch.global and went when Glitch did. Anything
 * else hosted elsewhere would eventually go the same way, so these are
 * generated from the id: the same name always gets the same two colours and
 * the same initials.
 */
function avatar (id) {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.codePointAt(0)) % 360

  const initials = id.split(/[-_ ]/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase() || '?'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="8" fill="hsl(${hash} 52% 42%)"/>
  <text x="32" y="41" text-anchor="middle" font-family="Segoe UI, system-ui, sans-serif"
        font-size="26" font-weight="600" fill="hsl(${hash} 60% 92%)">${initials}</text>
</svg>`

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400', ...CORS }
  })
}

/**
 * What the hw-16 demo talks to: json-server over chat.json, which is what was
 * on Glitch. The homework itself asks the student to run json-server locally —
 * this is the hosted copy the lesson links to so the demo can be seen working
 * without setting anything up.
 */
async function chatApi (request, path, url, env) {
  const face = path.match(/^\/avatar\/([^/]+)\.svg$/)
  if (face) return avatar(decodeURIComponent(face[1]))

  const updated = new Store(env.DB, 'chat-updated')
  const users = new Store(env.DB, 'chat-user')
  const messages = new Store(env.DB, 'chat-message')

  if (path === '/lastUpdate') {
    if (request.method === 'GET') {
      const stored = await updated.get('date')
      return json(stored || chat.lastUpdate)
    }
    if (request.method === 'PUT') {
      const body = await request.json().catch(() => ({}))
      await updated.put('date', body)
      return json(body)
    }
  }

  if (path === '/users' && request.method === 'GET') {
    const all = Object.values(await users.all(Object.fromEntries(chat.users.map((u) => [u.id, u]))))
    // A user a student adds has no picture in the repository, so the Worker
    // draws one from the name rather than leaving a broken image.
    return json(all.map((u) => (u.avatar ? u : { ...u, avatar: `${url.origin}/chat/avatar/${encodeURIComponent(u.id)}.svg` })))
  }

  const who = path.match(/^\/users\/([^/]+)$/)
  if (who && ['PATCH', 'PUT'].includes(request.method)) {
    const id = decodeURIComponent(who[1])
    const all = await users.all(Object.fromEntries(chat.users.map((u) => [u.id, u])))
    const body = await request.json().catch(() => ({}))
    const merged = request.method === 'PATCH' ? { ...(all[id] || { id }), ...body } : { id, ...body }
    await users.put(id, merged)
    return json(merged)
  }

  if (path === '/messages') {
    const seed = Object.fromEntries(chat.messages.map((m, i) => [String(m.id ?? i), m]))

    if (request.method === 'GET') {
      const all = Object.values(await messages.all(seed))
      all.sort((a, b) => (a.date || 0) - (b.date || 0))
      return json(all)
    }

    if (request.method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const id = String(body.id ?? Date.now())
      const record = { id, ...body }
      await messages.put(id, record)
      return json(record)
    }
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

  /chat/lastUpdate               GET PUT
  /chat/users                    GET, and PATCH /chat/users/<id>
  /chat/messages                 GET POST
  /chat/avatar/<id>.svg          a face, drawn from the name

Anything written here is gone within a day. The records the lessons print
are always here.
`

export default {
  async fetch (request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    // A HEAD is a GET whose answer is thrown away, and every checker sends
    // one. Routing only on GET made /rest-api/users/all answer 404 to a tool
    // asking whether it exists, while answering a browser perfectly.
    const asked = request.method
    if (asked === 'HEAD') request = new Request(request.url, { method: 'GET', headers: request.headers })

    const url = new URL(request.url)

    const answer = async () => {
      for (const [prefix, handler] of [
        ['/rest-api', restApi],
        ['/json-server', jsonServer],
        ['/form-data', formData],
        ['/chat', chatApi]
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

    const response = await answer()

    return asked === 'HEAD'
      ? new Response(null, { status: response.status, headers: response.headers })
      : response
  }
}