/**
 * Runs the Worker in Node and checks it against what the lessons print.
 *
 *   node test.js
 *
 * Every expectation here is copied from a console output in a lesson, so a
 * failure means a student would see something the text does not promise.
 */

import worker from './src/index.js'

const base = 'https://sandbox.example'
const env = {}   // no KV: writes land in memory, which is what a fresh deploy does

let passed = 0
const failures = []

const check = (what, got, want) => {
  const a = JSON.stringify(got)
  const b = JSON.stringify(want)
  if (a === b) { passed += 1; return }
  failures.push(`${what}\n    expected ${b}\n    got      ${a}`)
}

const call = async (path, init) => {
  const response = await worker.fetch(new Request(base + path, init), env)
  const type = response.headers.get('Content-Type') || ''
  const body = type.includes('json') ? await response.json()
    : type.includes('multipart') ? await response.formData()
      : await response.text()
  return { status: response.status, body, type }
}

/* ------------------------------------------------------------- rest-api */

{
  const { body } = await call('/rest-api/users/all')
  check('GET /users/all begemot', body.begemot, { name: 'Stephan', age: 36, speciality: 'doctor' })
  check('GET /users/all ids', Object.keys(body).sort(), ['451789', '789451', 'begemot'])
}

check('GET /user/begemot', (await call('/rest-api/user/begemot')).body,
  { name: 'Stephan', age: 36, speciality: 'doctor' })

check('GET /users/?name=Stephan', (await call('/rest-api/users/?name=Stephan')).body,
  [{ name: 'Stephan', age: 36, speciality: 'doctor' }])

check('GET /users?age=^18^', (await call('/rest-api/users?age=^18^')).body,
  [{ name: 'Feodor', age: 18, speciality: 'hobbit' }])

const written = { name: 'Mary', age: 19, speciality: 'developer' }
const post = (body) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

check('POST /user/987145', (await call('/rest-api/user/987145', post(written))).body, written)
check('POST again', (await call('/rest-api/user/987145', post(written))).body,
  { error: 475, message: '987145 allready exist' })
check('GET what was posted', (await call('/rest-api/user/987145')).body, written)

const put = { name: 'Helen', age: 20, speciality: 'florist' }
check('PUT /user/987145', (await call('/rest-api/user/987145',
  { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(put) })).body, put)

check('PATCH /user/987145', (await call('/rest-api/user/987145',
  { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hobby: 'flowers' }) })).body,
{ name: 'Helen', age: 20, speciality: 'florist', hobby: 'flowers' })

check('DELETE returns 200', (await call('/rest-api/user/987145', { method: 'DELETE' })).status, 200)
check('deleted is gone', (await call('/rest-api/user/987145')).status, 404)

/* ---------------------------------------------------------- json-server */

check('GET /json-server/users?name=Stephan first',
  (await call('/json-server/users?name=Stephan')).body[0].name, 'Stephan')

check('GET /json-server/users?name=Stephan&name=Andry',
  (await call('/json-server/users?name=Stephan&name=Andry')).body.map((u) => u.name), ['Stephan', 'Andry'])

{
  const { body } = await call('/json-server/lessons')
  check('lessons carry lesson and topic', Object.keys(body[0]).sort(), ['lesson', 'title', 'topic'])
  const unique = new Set(body.map((l) => l.lesson))
  check('lesson is unique — the store indexes it that way', unique.size, body.length)
}

check('GET /usernames/Stephan', (await call('/json-server/usernames/Stephan')).body, { name: 'Stephan' })
check('GET /usernames/nobody', (await call('/json-server/usernames/nobody')).body, null)

/* ----------------------------------------------------------- form-data */

{
  const { body } = await call('/form-data/forms/all')
  check('forms listing has frodo', body.frodo.name, 'Frodo')
  check('an avatar is described', typeof body.frodo.avatar, 'object')
}

{
  const { body, type } = await call('/form-data/forms/frodo')
  check('a form comes back as multipart', type.includes('multipart/form-data'), true)
  check('with the name in it', body.get('name'), 'Frodo')
  check('and the age', body.get('age'), '18')
}

{
  const sent = new FormData()
  sent.set('name', 'Bandit')
  sent.set('age', '7')
  const { status } = await call('/form-data/form/bandit', { method: 'POST', body: sent })
  check('POST a form returns 200', status, 200)

  const { body } = await call('/form-data/forms/bandit')
  check('and it can be read back', body.get('name'), 'Bandit')
}

/* --------------------------------------------------------------- done */

console.log(`\n  ${passed} passed, ${failures.length} failed\n`)
for (const f of failures) console.log(`  ${f}\n`)
process.exit(failures.length ? 1 : 0)
