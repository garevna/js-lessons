#!/usr/bin/env node
/**
 * The course map, as words search can find a lesson by.
 *
 * The map (public/maps/course.json) already lays the lessons out by meaning:
 * four rings from the core outwards, their branches, the points on the
 * branches, and the satellites on the outer orbit — each with its title in
 * three languages and the lessons it refers to. A lesson is found by every
 * title on the way to every place it sits on the map: inheritance-model by
 * «Прототипное наследование», «Модель наследования» and «Цепочка прототипов»,
 * in each language. So «наследование» finds the whole ring, and «цепочка
 * прототипов» the one point.
 *
 * The rings and the satellites are also concepts of the dictionary
 * (content-worker/src/assets/dictionary.js), which brings the names the map
 * does not print: fp and func staff for the ring of functional programming,
 * async for asynchrony.
 *
 * Written to content-worker/src/assets/rings.js, with every title once: the
 * nodes and their titles, and per lesson only the nodes it sits under.
 *
 *   npm run rings
 */

const fs = require('fs')
const path = require('path')
const vm = require('vm')

const root = path.join(__dirname, '..')
const ASSETS = path.join(root, 'content-worker/src/assets')
const MAP = path.join(root, 'public/maps/course.json')
const OUT = path.join(ASSETS, 'rings.js')

// A ring or a satellite of the map → the concept of the dictionary it is.
const CONCEPTS = {
  r1: 'basics',
  r2: 'inheritance',
  r3: 'functional programming',
  r4: 'asynchrony',
  'sat-patterns': 'design pattern',
  'sat-webapi': 'browser',
  'sat-eng': 'tools',
  'sat-solid': 'principle'
}

const load = (file, name) => {
  const code = fs.readFileSync(path.join(ASSETS, file), 'utf8').replace(`export const ${name} =`, 'module.exports =')
  const box = { module: {} }
  vm.runInNewContext(code, box)
  return box.module.exports
}

const dictionary = load('dictionary.js', 'dictionary')
const map = JSON.parse(fs.readFileSync(MAP, 'utf8'))

// ——— the dictionary and the map check themselves first ———

const owner = new Map()
const trouble = []

for (const [key, entry] of Object.entries(dictionary)) {
  for (const word of [key, ...(entry.eng || [])]) {
    const said = word.toLowerCase()
    if (owner.has(said) && owner.get(said) !== key) trouble.push(`"${said}" is in both ${owner.get(said)} and ${key}`)
    owner.set(said, key)
  }
}

for (const [id, key] of Object.entries(CONCEPTS)) {
  if (!dictionary[key]) trouble.push(`${id} is ${key}, which the dictionary does not have`)
}

// ——— walk the map ———

// «1. Основы», «🛰️ SOLID»: the number and the satellite are drawing, not words
const clean = (title) => title.replace(/^\s*(?:\d+\.\s*|🛰️\s*)/u, '').trim()

const titlesOf = (title) => {
  if (!title) return []
  const all = typeof title === 'string' ? [title] : [title.ru, title.ua, title.eng]
  return [...new Set(all.filter(Boolean).map(clean))]
}

const nodes = {}
const lessons = {}

const walk = (node, id, trail) => {
  nodes[id] = titlesOf(node.title)
  const here = [...trail, id]

  for (const ref of node.refs || []) {
    // functionality#pure_function is a place in the lesson, and the lesson is functionality
    const lesson = ref.split('#')[0]
    lessons[lesson] = [...new Set([...(lessons[lesson] || []), ...here])]
  }

  // Items have no id of their own on the map, so they are named by their
  // place under the node they hang from.
  const children = [...(node.branches || []), ...(node.items || []), ...(node.satellites || [])]
  children.forEach((child, at) => walk(child, child.id || `${id}.${at}`, here))
}

map.rings.forEach((ring) => walk(ring, ring.id, []))
map.outerOrbit.satellites.forEach((satellite) => walk(satellite, satellite.id, []))

for (const id of Object.keys(CONCEPTS)) {
  if (!nodes[id]) trouble.push(`CONCEPTS names ${id}, which is not on the map`)
}

if (trouble.length) {
  console.log('dictionary and map:')
  trouble.forEach((line) => console.log(`  ${line}`))
}

// ——— write ———

const quote = (text) => `'${String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const name = (key) => (/^[A-Za-z_$][\w$]*$/.test(key) ? key : quote(key))
const list = (values) => `[${values.map(quote).join(', ')}]`

const block = (object) => Object.keys(object)
  .map((key) => `    ${name(key)}: ${Array.isArray(object[key]) ? list(object[key]) : quote(object[key])},`)
  .join('\n')

const sorted = (object) => Object.fromEntries(Object.keys(object).sort((a, b) => a.localeCompare(b)).map((key) => [key, object[key]]))

const file = `/**
 * Written by tools/rings.js from public/maps/course.json — run npm run rings
 * rather than editing it.
 *
 *   nodes     every place on the course map, with its title in each language
 *   concepts  the ring or satellite each of them is, as a key of dictionary.js
 *   lessons   per lesson, the places on the way to wherever it sits on the map
 *
 * What a lesson is about besides is in keywords.js; search reads both.
 */
export const rings = {
  nodes: {
${block(nodes)}
  },
  concepts: {
${block(CONCEPTS)}
  },
  lessons: {
${block(sorted(lessons))}
  }
}
`

const before = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
fs.writeFileSync(OUT, file, 'utf8')

console.log(`rings.js: ${Object.keys(nodes).length} places on the map, ${Object.keys(lessons).length} lessons${before === file ? ' — unchanged' : ''}`)

if (trouble.length) process.exitCode = 1
