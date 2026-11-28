#!/usr/bin/env node
/**
 * Which concepts a lesson uses — written to content-worker/src/assets/uses.js
 * as keys of the dictionary, for search.
 *
 * A lesson's keywords (keywords.js, by hand) say what it is about. That is not
 * all a reader looks for it by: someone who types "factory" wants the lesson
 * on factories and also every lesson that builds its objects with one. So the
 * rules below say, for each concept in dictionary.js, how to see it in a
 * lesson — its name in the text, in any of the three languages, or its shape
 * in the code — and the lessons where it is seen get the concept's key.
 *
 * Only keys are written, never words: the words live once, in the dictionary,
 * with their translations, and search reads them from there.
 *
 * Read from the built pages (public/lessons/<lang>/<page>.md), so it runs
 * after npm run lessons. It writes uses.js whole every time: the file is
 * generated, and the place to change what it says is here or in the
 * dictionary.
 *
 *   npm run uses             write uses.js
 *   npm run uses -- --show   and list the lessons each rule found
 */

const fs = require('fs')
const path = require('path')
const vm = require('vm')

const root = path.join(__dirname, '..')
const ASSETS = path.join(root, 'content-worker/src/assets')
const LESSONS = path.join(root, 'public/lessons')
const DEMOS = path.join(LESSONS, 'js')
const OUT = path.join(ASSETS, 'uses.js')

const show = process.argv.includes('--show')

const load = (file, name) => {
  const code = fs.readFileSync(path.join(ASSETS, file), 'utf8').replace(`export const ${name} =`, 'module.exports =')
  const box = { module: {} }
  vm.runInNewContext(code, box)
  return box.module.exports
}

/**
 * How to see a concept in a lesson.
 *
 * prose  — named in the text, in any of the three languages;
 * code   — its shape in the lesson's code: fenced listings, the ♠ exercises
 *          and the demos the lesson runs;
 * min    — how many times it has to be there, for what a lesson may mention
 *          in passing without using.
 *
 * Kept to what a reader would look for and what is not on every page. An
 * arrow function or a template literal is in most of the later lessons, and a
 * search that answers with sixty of them answers nothing.
 */
const RULES = [
  // techniques and patterns
  { key: 'factory', prose: /фабрик|factory/i, code: /(?:function\s+|(?:const|let|var)\s+)(?:create|make|build)[A-Z][\w$]*\s*(?:=|\()/ },
  { key: 'closure', prose: /замыкани|замиканн|closure/i },
  { key: 'recursion', prose: /рекурси|recursi/i },
  { key: 'iife', prose: /\bIIFE\b/i },
  { key: 'currying', prose: /карриров|каррін|curry/i },
  { key: 'decorator', prose: /декоратор|decorator/i },
  { key: 'debounce', prose: /debounc|throttl|дебаунс|тротл|троттл/i },
  { key: 'delegation', prose: /делегирован|делегуван|delegation/i },
  { key: 'design pattern', prose: /паттерн|патерн|design pattern/i },
  { key: 'pure function', prose: /чист\S+ функци|чист\S+ функці|pure function/i },
  { key: 'immutability', prose: /иммутабел|імутабел|immutab/i, code: /Object\.freeze/ },
  { key: 'higher-order function', prose: /высшего порядка|вищого порядку|higher[- ]order/i },
  { key: 'callback', prose: /колбек|коллбэк|колбэк|callback/i, min: 2 },
  { key: 'hoisting', prose: /hoisting|всплыти|хойстинг|підняття/i },
  { key: 'scope', prose: /област\S* видимост|\bscope\b/i, min: 2 },
  { key: 'context', prose: /контекст\S* вызова|контекст\S* виклику|call context|execution context/i },
  { key: 'prototype', prose: /прототип|prototype chain/i, code: /\.prototype\b|__proto__|Object\.(?:create|setPrototypeOf|getPrototypeOf)\(/, min: 3 },
  { key: 'class', code: /\bclass\s+[A-Z_$][\w$]*/ },
  { key: 'getter', prose: /геттер|сеттер|getter|setter/i, code: /^\s*(?:static\s+)?(?:get|set)\s+[A-Za-z_$#][\w$]*\s*\(/m },
  { key: 'private', code: /\bthis\.#[A-Za-z_$]|\bstatic\s+#|^\s*#[A-Za-z_$][\w$]*\s*(?:=|\()/m },
  { key: 'descriptor', code: /Object\.defineProperty|getOwnPropertyDescriptor/ },

  // asynchrony
  { key: 'promise', code: /new Promise\b|Promise\.(?:all|any|race|resolve|reject|allSettled)\b|\.then\(/, min: 3 },
  { key: 'async function', code: /\basync\s+(?:function|\(|[A-Za-z_$][\w$]*\s*=>)|\bawait\s/ },
  { key: 'generator', code: /function\s*\*|\byield\b/ },
  { key: 'iterator', code: /Symbol\.(?:asyncIterator|iterator)/ },
  { key: 'timer', code: /\bset(?:Timeout|Interval)\s*\(/, min: 3 },
  { key: 'requestanimationframe', code: /requestAnimationFrame/ },
  { key: 'microtask', prose: /микротаск|мікротаск|microtask/i, code: /queueMicrotask/ },
  { key: 'event loop', prose: /event loop|цикл\S* событий|цикл\S* подій/i },
  { key: 'worker', code: /new (?:Shared)?Worker\(/ },

  // errors
  { key: 'exception', code: /\btry\s*\{|\bthrow\b/ },
  { key: 'error', code: /new (?:Error|TypeError|RangeError|SyntaxError|ReferenceError|AggregateError)\b/ },

  // the language
  { key: 'destructuring', prose: /деструктур|destructur/i },
  // the word spread alone is ordinary English, and "spread across" is no operator
  { key: 'spread', prose: /spread[- ](?:operator|syntax)|оператор spread|спред|rest[- ]параметр|rest parameter|оператор расширени|оператор розширенн|остаточн\S* параметр|залишков\S* параметр/i },
  { key: 'proxy', code: /new Proxy\b|\bReflect\./ },
  // Making a symbol, or giving an object a method under one. Not the line
  // Symbol(Symbol.toStringTag): "History" — that is console.dir output pasted
  // into a listing, and a dozen pages have one.
  { key: 'symbol', code: /\bSymbol\((?!Symbol\.)|Symbol\.for\(|\[Symbol\.\w+\]\s*(?:\(|=[^=]|:\s*(?:function|async|\(|\*))/ },
  { key: 'collection', code: /new (?:Weak)?(?:Map|Set)\b/ },
  { key: 'regexp', code: /new RegExp\b|\/[^/\n*]+\/[gimsuy]*\.(?:test|exec)\(|\.(?:match|matchAll|replace|replaceAll|split|search)\(\s*\/(?![/*])/ },
  { key: 'optional chaining', code: /[\w$\])]\?\.[\w$[(]/ },
  { key: 'nullish coalescing', code: /[^?\n]\s*\?\?(?!\?)/ },
  { key: 'template literal', prose: /темплейтн|шаблонн\S* (?:строк|литерал|рядк|літерал)|template literal/i },
  { key: 'bind', code: /\.(?:bind|call|apply)\(/, min: 3 },
  { key: 'json', code: /JSON\.(?:parse|stringify)/, min: 3 },
  { key: 'date', code: /new Date\b/, min: 2 },
  { key: 'bigint', code: /\bBigInt\(|\b\d+n\b/ },
  { key: 'strict mode', code: /['"]use strict['"]/ },
  { key: 'module', code: /^\s*(?:import|export)\s|\bimport\(/m },

  // the browser
  { key: 'ajax', code: /\bfetch\(|XMLHttpRequest/, min: 2 },
  { key: 'storage', code: /localStorage|sessionStorage/ },
  { key: 'cookie', code: /document\.cookie/ },
  { key: 'database', code: /indexedDB\./ },
  { key: 'event listener', code: /addEventListener/ },
  { key: 'event', code: /new CustomEvent|dispatchEvent/ },
  { key: 'web component', code: /customElements\.define/ },
  { key: 'shadow dom', code: /attachShadow/ },
  { key: 'template', code: /<template[\s>]/ },
  { key: 'mutationobserver', code: /MutationObserver/ },
  { key: 'intersectionobserver', code: /IntersectionObserver/ },
  { key: 'postmessage', code: /postMessage/ },
  { key: 'websocket', code: /new WebSocket/ },
  { key: 'filereader', code: /new FileReader/ },
  { key: 'formdata', code: /new FormData/ },
  { key: 'blob', code: /new Blob\b/ },
  { key: 'typed array', code: /ArrayBuffer|(?:Ui|I)nt(?:8|16|32)Array|Float(?:32|64)Array|DataView/ },
  { key: 'readablestream', code: /ReadableStream|getReader\(/ },
  { key: 'notification', code: /new Notification|Notification\.requestPermission/ },
  { key: 'geolocation', code: /geolocation/ },
  { key: 'canvas', code: /getContext\(['"]2d/ },
  { key: 'svg', code: /createElementNS|<svg/ },
  { key: 'performance', code: /performance\.(?:now|mark|measure)/ }
]

/**
 * The rings of the course map, and the concept each one is.
 *
 * The broad ideas are not guessed from the text: which lessons are about
 * prototypal inheritance, functional programming or asynchrony has already
 * been decided, by hand, when the lessons were laid out on the map
 * (content/areas.json). Every lesson in a ring gets the ring's concept, and
 * «наследование» finds the ring «Прототипное наследование» — the rules above
 * are left for the narrow things, the ones a lesson uses without being about.
 */
const RINGS = {
  'Основы': 'basics',
  'Прототипное наследование': 'inheritance',
  'Функциональщина': 'functional programming',
  'Асинхронщина': 'asynchrony',
  'Браузер': 'browser',
  'Инструменты': 'tools'
}

const dictionary = load('dictionary.js', 'dictionary')
const keywords = load('keywords.js', 'keywords')
const menu = load('mainMenu.js', 'mainMenu')
const areas = JSON.parse(fs.readFileSync(path.join(root, 'content/areas.json'), 'utf8'))

// ——— the dictionary checks itself first ———

const owner = new Map()
const trouble = []

for (const [key, entry] of Object.entries(dictionary)) {
  for (const word of [key, ...(entry.eng || [])]) {
    const said = word.toLowerCase()
    if (owner.has(said) && owner.get(said) !== key) trouble.push(`"${said}" is in both ${owner.get(said)} and ${key}`)
    owner.set(said, key)
  }
}

for (const rule of RULES) {
  if (!dictionary[rule.key]) trouble.push(`a rule names ${rule.key}, which the dictionary does not have`)
}

for (const ring of areas.areas) {
  if (!RINGS[ring]) trouble.push(`the map has a ring "${ring}" that RINGS does not name`)
  else if (!dictionary[RINGS[ring]]) trouble.push(`the ring "${ring}" is ${RINGS[ring]}, which the dictionary does not have`)
}

if (trouble.length) {
  console.log('dictionary:')
  trouble.forEach((line) => console.log(`  ${line}`))
}

// ——— the lessons: what is said, and what is code ———

const split = (text) => {
  const code = []
  const prose = []
  let fence = null

  for (const line of text.split(/\r?\n/)) {
    const marker = line.trim()

    if (fence) {
      const closes = (fence !== '~' && fence !== 'console' && /^♠{4}\s*$/.test(marker)) || ((fence === '~' || fence === 'console') && /^~{3,}\s*$/.test(marker))
      if (closes) { fence = null; continue }

      // An exercise's checks are the course grading the reader, not code the
      // lesson teaches: a regular expression in a check is no regexp lesson.
      if (fence === '♠' && /^\?{3}\s*$/.test(marker)) { fence = 'checks'; continue }
      if (fence === 'checks') continue

      // what a console printed is not the lesson's code
      if (fence === 'console') prose.push(line)
      else code.push(line)
      continue
    }

    if (/^~{3}console/.test(marker)) { fence = 'console'; continue }
    if (/^~{3,}/.test(marker)) { fence = '~'; continue }
    if (/^♠{4}/.test(marker)) { fence = '♠'; prose.push(marker.replace(/^♠{4}/, '')); continue }

    // a demo the lesson runs is code the lesson shows
    const demo = marker.match(/^\{\{\{(.+?)\}\}\}$/)
    if (demo && fs.existsSync(path.join(DEMOS, demo[1]))) {
      code.push(fs.readFileSync(path.join(DEMOS, demo[1]), 'utf8'))
      continue
    }

    prose.push(line)
  }

  return { code: code.join('\n'), prose: prose.join('\n') }
}

const count = (pattern, text) => {
  if (!pattern || !text) return 0
  const all = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
  return (text.match(all) || []).length
}

const refs = menu.flatMap((section) => section.items.map((item) => item.ref))
const uses = {}
const found = RULES.map(() => [])

for (const ref of refs) {
  const pages = ['ru', 'eng', 'ua']
    .map((lang) => path.join(LESSONS, lang, `${ref}.md`))
    .filter((file) => fs.existsSync(file))
    .map((file) => split(fs.readFileSync(file, 'utf8')))

  if (!pages.length) continue

  // The code is the same in every language and is counted once; the prose is
  // counted across all three, which is why a concept named in passing in one
  // sentence still counts once per language — min asks for more than that.
  const code = pages[0].code
  const prose = pages.map((page) => page.prose).join('\n')

  // what the lesson's own keywords already reach
  const reached = new Set((keywords[ref] || []).map((word) => owner.get(String(word).toLowerCase())).filter(Boolean))

  const keys = []

  for (const ring of (areas.pages[ref] || [])) {
    const key = RINGS[ring]
    if (key && !reached.has(key) && !keys.includes(key)) keys.push(key)
  }

  RULES.forEach((rule, at) => {
    if (count(rule.code, code) + count(rule.prose, prose) < (rule.min || 1)) return
    found[at].push(ref)
    if (!reached.has(rule.key) && !keys.includes(rule.key)) keys.push(rule.key)
  })

  if (keys.length) uses[ref] = keys.sort()
}

// ——— write ———

const quote = (text) => `'${text.replace(/'/g, "\\'")}'`
const name = (ref) => (/^[A-Za-z_$][\w$]*$/.test(ref) ? ref : quote(ref))

const body = Object.keys(uses)
  .sort((a, b) => a.localeCompare(b))
  .map((ref) => `  ${name(ref)}: [${uses[ref].map(quote).join(', ')}],`)
  .join('\n')

const file = `/**
 * Written by tools/uses.js — run npm run uses rather than editing it.
 *
 * Per lesson, as keys of dictionary.js: the rings of the course map it sits in
 * (content/areas.json), and the concepts it uses, found in its text and its
 * code. What a lesson is about is in keywords.js; search reads both.
 */
export const uses = {
${body}
}
`

const before = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
fs.writeFileSync(OUT, file, 'utf8')

const total = Object.values(uses).reduce((sum, list) => sum + list.length, 0)
console.log(`uses.js: ${Object.keys(uses).length} lessons, ${total} concepts${before === file ? ' — unchanged' : ''}`)

if (show) {
  RULES.forEach((rule, at) => {
    console.log(`\n${rule.key} — ${found[at].length}`)
    console.log(`  ${found[at].join(', ')}`)
  })
}

if (trouble.length) process.exitCode = 1
