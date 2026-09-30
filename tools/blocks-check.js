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
 * That is what happened, twice. The slider pattern was any !![ followed by
 * anything up to the next ], across as many lines as it took to find one. The
 * lessons on type coercion write !![] and !![5] in their questions, and the
 * pattern carried six of them off. One half-question reached the test renderer
 * with no answers behind it:
 *
 *   Cannot read properties of undefined (reading 'split')
 *
 * and the page stopped rendering there. Nothing in the build noticed; the
 * pages built, the bundles built, CI was green.
 *
 * This asks the real table the real question, for every built page: after the
 * blocks are lifted out, is every line that carries markup still whole?
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

/**
 * A question read the way the renderer reads it, and what is wrong with it.
 *
 * From the right: the answer is last, the choices before it, and everything
 * left over is the question. Splitting into three from the left loses any
 * question with a pipe in it — and a lesson about coercion asks about
 * `[!!{}] || true`, where the || was read as two empty separators. The choices
 * came out empty and the question rendered with one blank button.
 *
 * Quotes around a choice are how a choice is written when it is a string; the
 * renderer lets the HTML parser eat them as attribute delimiters, so they are
 * taken off here too before the answer is looked for among them.
 */
// One layer only. The renderer writes the choice into value=… unquoted and
// lets the HTML parser take the outer pair as delimiters, so exactly one
// pair comes off — and a choice written '""' is the empty string, not
// nothing at all.
const unquote = (text) => {
  const single = text.replace(/^'([^]*)'$/, '$1')
  if (single !== text) return single
  return text.replace(/^"([^]*)"$/, '$1')
}

const quizTrouble = (body) => {
  const parts = body.split('|')

  // The answer is written without quotes and set as an attribute as it is;
  // only the choices go through the HTML parser, which eats their outer pair.
  const answer = (parts.pop() || '').trim()
  const choices = (parts.pop() || '').split(',').map((choice) => unquote(choice.trim()))
  const question = parts.join('|').trim()

  if (!question) return { what: 'вопрос пустой', detail: body.trim().slice(0, 74) }
  if (choices.length < 2) return { what: `вариантов ${choices.length}`, detail: body.trim().slice(0, 74) }
  if (!answer) return { what: 'ответ пустой', detail: body.trim().slice(0, 74) }

  if (!choices.includes(answer)) {
    return {
      what: `ответа "${answer}" нет среди вариантов`,
      detail: choices.join(' / ').slice(0, 74)
    }
  }

  return null
}

const TESTS_FENCE = '~~~tests'

/**
 * What parsePageContent leaves to be read as lines, plus the inside of every
 * ~~~tests block.
 *
 * A block of questions is lifted out like any other fenced block, and its
 * questions would then never be looked at — which is the one kind of line this
 * tool exists for. So the blocks are read back in.
 */
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

  for (const key of Object.keys(page.fragments)) {
    const content = page.fragments[key] && page.fragments[key].content
    if (typeof content !== 'string') continue
    if (content.slice(0, TESTS_FENCE.length) !== TESTS_FENCE) continue
    texts.push(content)
  }

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
let checked = 0

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

      for (const kind of LINES) {
        if (!line.includes(kind.marker)) continue

        checked++

        // Two markers, one line: a line cut in half keeps only one.
        const count = line.split(kind.marker).length - 1

        if (count !== 2) {
          broken.push({ name, what: `${kind.name}: маркеров ${count}, а не 2`, detail: line.trim().slice(0, 74) })
          break
        }

        const body = line.split(kind.marker).find((piece) => piece.length)

        if (body === undefined) {
          broken.push({ name, what: `${kind.name}: пусто между маркерами`, detail: line.trim().slice(0, 74) })
          break
        }

        if (kind.parts > 1 && body.split('|').length < kind.parts) {
          broken.push({
            name,
            what: `${kind.name}: частей ${body.split('|').length}, нужно ${kind.parts}`,
            detail: body.trim().slice(0, 74)
          })
          break
        }

        if (kind.marker === '→→→') {
          const trouble = quizTrouble(body)
          if (trouble) broken.push({ name, what: `тест: ${trouble.what}`, detail: trouble.detail })
        }

        break
      }
    }
  }
}

console.log(`\n${pages.length} built pages, ${checked} строк с разметкой проверено`)

if (!broken.length) {
  console.log('\nничего не разорвано\n')
  process.exit(0)
}

console.log(`\nразорвано: ${broken.length}\n`)

for (const item of broken) {
  console.log(`  ${item.name}`)
  console.log(`    ${item.what}`)
  console.log(`    ${item.detail}`)
}

console.log('\nОдин из блочных шаблонов в src/configs/pageRegExpr.js захватил больше,')
console.log('чем должен, и вырезал часть строки вместе со своим блоком.\n')

process.exit(1)
