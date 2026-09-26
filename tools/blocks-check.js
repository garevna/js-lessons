#!/usr/bin/env node
/**
 * Does the block markup of every page survive being taken apart?
 *
 *   npm run blocks
 *
 * A page is not rendered line by line. The block patterns in
 * src/configs/pageRegExpr.js are matched first, and each block found is lifted
 * out and replaced by a !!!n!!! marker; what is left is then read as lines.
 *
 * So a pattern that matches more than it should does not fail loudly — it
 * quietly removes text from the middle of the page, and whatever was around it
 * arrives at the renderer cut in half.
 *
 * That is what happened. The slider pattern was /!!\[.[^\]]+\]/, which is not
 * a slider but any !![ followed by anything up to the next ] — across as many
 * lines as it took to find one. On the lesson about explicit type coercion,
 * whose questions are written in JavaScript and say !![] and !!{}, it matched
 * from one line to a ] six lines down and took six test questions with it. One
 * half-question reached the test renderer with no answers behind it:
 *
 *   Cannot read properties of undefined (reading 'split')
 *
 * and the page stopped rendering there. Nothing in the build noticed; the
 * pages built, the bundles built, CI was green.
 *
 * This asks the real table the real question, for every built page: after the
 * blocks are lifted out, is every line that carries a marker still whole?
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'public/lessons')

const { pageRegExpr } = require('../src/configs/pageRegExpr.js')

/**
 * The line markup, and what each line has to hold to be renderable.
 *
 * A test needs three parts: the question, the choices, the answer. A live demo
 * spoiler needs two. The others only need to survive with their markers paired.
 */
const LINES = [
  { name: 'тест', marker: '→→→', parts: 3 },
  { name: 'демо-спойлер', marker: '§§§§', parts: 2 },
  { name: 'слоган', marker: '☼☼☼', parts: 1 },
  { name: 'заголовок примера', marker: '♦♦♦', parts: 1 },
  { name: 'кнопка', marker: '※※※', parts: 1 }
]

/** What parsePageContent does to a page, without a DOM to render into. */
const textOf = (pageContent) => {
  const page = { fragments: {}, pageContent, regExprs: pageRegExpr }

  page.regExprs.pageContent = page.pageContent
  for (const fragment of page.regExprs) Object.assign(page.fragments, fragment)
  page.pageContent = page.fragments.pageContent
  delete page.fragments.pageContent

  const texts = []
  const markers = page.pageContent.match(/!!!\d+!!!/g)

  if (markers) {
    for (const marker of markers) {
      const parts = page.pageContent.split(marker)
      while (parts.length > 1) texts.push(parts.shift())
      page.pageContent = parts.join('')
    }
  }

  if (page.pageContent.length) texts.push(page.pageContent)

  return texts
}

const pages = []
for (const lang of fs.readdirSync(LESSONS)) {
  const dir = path.join(LESSONS, lang)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith('.md')) pages.push([`${lang}/${file}`, path.join(dir, file)])
  }
}

const broken = []

for (const [name, file] of pages) {
  let texts

  try {
    texts = textOf(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    broken.push({ name, what: 'разбор упал', detail: error.message })
    continue
  }

  for (const text of texts) {
    for (const line of text.split('\n')) {
      if (!line.length) continue

      for (const { name: kind, marker, parts } of LINES) {
        if (!line.includes(marker)) continue

        // Two markers, one line: a line cut in half keeps only one.
        const count = line.split(marker).length - 1
        if (count !== 2) {
          broken.push({ name, what: `${kind}: маркеров ${count}, а не 2`, detail: line.trim().slice(0, 74) })
          break
        }

        const body = line.split(marker).find((piece) => piece.length)
        if (body === undefined) {
          broken.push({ name, what: `${kind}: пусто между маркерами`, detail: line.trim().slice(0, 74) })
          break
        }

        if (parts > 1 && body.split('|').length < parts) {
          broken.push({
            name,
            what: `${kind}: частей ${body.split('|').length}, нужно ${parts}`,
            detail: body.trim().slice(0, 74)
          })
        }

        break
      }
    }
  }
}

console.log(`\n${pages.length} built pages, ${LINES.length} kinds of line markup`)

if (!broken.length) {
  console.log('\nничего не разорвано\n')
  process.exit(0)
}

console.log(`\nразорвано: ${broken.length}\n`)

for (const { name, what, detail } of broken) {
  console.log(`  ${name}`)
  console.log(`    ${what}`)
  console.log(`    ${detail}`)
}

console.log('\nОдин из блочных шаблонов в src/configs/pageRegExpr.js захватил больше,')
console.log('чем должен, и вырезал часть строки вместе со своим блоком.\n')

process.exit(1)
