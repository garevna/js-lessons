#!/usr/bin/env node
/**
 * The four areas the course is really about, and which lesson belongs to which.
 *
 * The menu is a sequence — it has to be, the course is read in order — and a
 * sequence cannot say that DOM events belong to the browser and to the
 * asynchronous world at once. Areas are labels, not a tree: a lesson carries
 * as many as it honestly has.
 *
 * This writes a draft into content/areas.json from the section a lesson sits
 * in, because recognising a wrong label is far easier than recalling the right
 * one from nothing. Run it again after adding pages and it fills in only what
 * is missing — anything already in the file is left exactly as it is.
 *
 *   node tools/areas.js           report only
 *   node tools/areas.js --write   write the draft
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MENU = path.join(root, 'content-worker/src/assets/mainMenu.js')
const AREAS = path.join(root, 'content/areas.json')

const write = process.argv.includes('--write')

const BASICS = 'Основы'
const PROTOTYPES = 'Прототипное наследование'
const FUNCTIONAL = 'Функциональщина'
const ASYNC = 'Асинхронщина'
const BROWSER = 'Браузер'
const TOOLS = 'Инструменты'

/**
 * A first guess, by section. Where a section spans two areas it gets both —
 * "Функция как объект" is the doorway from the basics into prototypes, and
 * generators are a functional idea used asynchronously.
 *
 * Sections with an empty list are the ones the four areas do not reach. They
 * are not mistakes: the four describe the language, and a quarter of the
 * course is the browser and the toolchain.
 */
const BY_SECTION = {
  'Введение. Основы': [BASICS],
  'Переменные. Типы данных': [BASICS],
  'Приведение типов.': [BASICS],
  'Операторы. Выражения.': [BASICS],
  'Методы': [BASICS],
  'Функция как объект': [BASICS, PROTOTYPES],
  'Прототипное наследование': [PROTOTYPES],
  'Изменение контекста вызова': [BASICS, FUNCTIONAL],
  'Функциональщина': [FUNCTIONAL],
  'BOM & DOM': [BROWSER],
  'Асинхронщина': [ASYNC, BROWSER],
  'События объектов DOM': [],
  'Контекст. Замыкание': [BASICS, FUNCTIONAL],
  'Итерирование массивов. SHA': [FUNCTIONAL],
  'Статические методы конструктора Object': [PROTOTYPES],
  'AJAX. Promise': [ASYNC, BROWSER],
  'Fetch API. CORS': [ASYNC, BROWSER],
  'File API. FormData': [ASYNC, BROWSER],
  'Асинхронная функция': [ASYNC],
  'REST API': [ASYNC, BROWSER],
  'Классы': [PROTOTYPES],
  'Генераторы и итераторы': [FUNCTIONAL, ASYNC],
  'Веб-компоненты': [BROWSER],
  'Webpack': [TOOLS],
  'Final project': [BROWSER],
  'Встроенные объекты': [BASICS, PROTOTYPES],
  'Design Patterns': [FUNCTIONAL, PROTOTYPES],
  'IndexedDB': [ASYNC, BROWSER],
  'Дополнительный материал': [],
  'Справочный материал': [TOOLS],
  'ECMAScript': [BASICS]
}

/**
 * Where the section is the wrong answer for one of its lessons. Chrome
 * DevTools sits among the basics because that is when it is taught, but it is
 * not the language; curl and json-server sit among promises and REST for the
 * same reason.
 */
const BY_PAGE = {
  'Developer-tools': [TOOLS],
  'Chrome-dev-tools': [TOOLS],
  curl: [TOOLS],
  'json-server': [TOOLS],
  'JSON-placeholder': [TOOLS],
  // import() is a language feature taught in the webpack chapter.
  'dynamic-import': [BASICS, TOOLS],
  // Measured with the Performance API and read in a DevTools panel.
  performance: [BROWSER, TOOLS],
  'web-workers': [BROWSER, ASYNC],
  'web-socket': [BROWSER, ASYNC],
  NotificationAPI: [BROWSER],
  'throttling-and-debouncing': [FUNCTIONAL],
  // Principles of design, the same ground the patterns chapter stands on.
  SOLID: [FUNCTIONAL, PROTOTYPES],
  // How a network works, underneath everything and part of none of it.
  'tcp-ip': []
}


const menu = fs.readFileSync(MENU, 'utf8')
const sections = menu.split(/\n {2}\{/).slice(1).map((block) => ({
  ru: (block.split('items:')[0].match(/ru:\s*'([^']*)'/) || [])[1] || '?',
  items: [...block.matchAll(/\{\s*ref:\s*'([^']+)'/g)].map((m) => m[1])
}))

const existing = fs.existsSync(AREAS)
  ? JSON.parse(fs.readFileSync(AREAS, 'utf8'))
  : { areas: [BASICS, PROTOTYPES, FUNCTIONAL, ASYNC, BROWSER, TOOLS], pages: {} }

const pages = { ...existing.pages }
const added = []
const uncovered = []

for (const section of sections) {
  const guess = BY_SECTION[section.ru]

  if (guess === undefined) {
    uncovered.push([section.ru, section.items.length, 'no rule for this section'])
    continue
  }

  if (!guess.length && section.items.length) {
    uncovered.push([section.ru, section.items.length, 'outside the four areas'])
  }

  for (const page of section.items) {
    // Never touch what is already there: the draft is a starting point, and
    // the corrections are the valuable part.
    if (pages[page] !== undefined) continue
    pages[page] = [...(BY_PAGE[page] || guess)]
    added.push(page)
  }
}

const out = { areas: existing.areas, pages }

const counts = {}
for (const list of Object.values(pages)) {
  if (!list.length) counts['(без области)'] = (counts['(без области)'] || 0) + 1
  for (const area of list) counts[area] = (counts[area] || 0) + 1
}

console.log(write ? 'WROTE content/areas.json' : 'DRAFT (dry run — pass --write)')
console.log(`  ${Object.keys(pages).length} pages, ${added.length} of them new to the file\n`)

for (const [area, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${area}`)
}

console.log(`\nsections the four areas do not reach: ${uncovered.length}`)
for (const [name, n, why] of uncovered) {
  console.log(`  ${name.padEnd(38)} ${String(n).padStart(2)} lessons   ${why}`)
}

if (write) fs.writeFileSync(AREAS, JSON.stringify(out, null, 2) + '\n')
