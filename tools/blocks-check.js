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
const QUIZ_FENCE = '♣♣♣♣'
const FIX_FENCE = '♠♠♠♠'

/**
 * What can go wrong inside a ♠ block.
 *
 * All of it is about the halves. The block is code above ??? and checks
 * below it, and every way of getting that wrong renders as something that
 * looks deliberate: a block with no ??? is all code and cannot be graded, a
 * check with no body always passes, and a check worth no points is scored
 * out of a total it does not add to.
 */
const fixBlockTrouble = (content) => {
  const lines = content.split('\n')
  const body = lines.slice(1, -1)
  const trouble = []

  const at = body.findIndex((line) => /^[ \t]*\?{3}[ \t]*$/.test(line))

  if (at === -1) {
    return [{ what: 'нет ??? — код не отделён от проверок', detail: lines[0].trim().slice(0, 74) }]
  }

  if (!body.slice(0, at).join('').trim()) {
    trouble.push({ what: 'код пустой', detail: lines[0].trim().slice(0, 74) })
  }

  let check = null
  let count = 0

  const close = () => {
    if (check && !check.body) {
      trouble.push({ what: 'проверка без кода — нечему сработать', detail: check.title })
    }
    check = null
  }

  for (const raw of body.slice(at + 1)) {
    const line = raw.trim()
    if (!line) continue

    const head = line.match(/^\?[ \t]*(\d+)?[ \t]*\|?[ \t]*(.*)$/)

    if (head) {
      close()
      count++
      check = { title: (head[2] || '').trim().slice(0, 74), body: false }
      if (!head[1]) {
        trouble.push({ what: 'у проверки не указаны баллы', detail: check.title })
      }
      if (!check.title) {
        trouble.push({ what: 'у проверки нет названия', detail: line.slice(0, 74) })
      }
      continue
    }

    if (!check) {
      trouble.push({ what: 'строка после ??? до первой проверки', detail: line.slice(0, 74) })
      continue
    }

    check.body = true
  }

  close()

  if (!count) trouble.push({ what: 'ни одной проверки', detail: lines[0].trim().slice(0, 74) })

  return trouble
}

/**
 * What can go wrong inside a ♣ block.
 *
 * The short form is one line and its failure is a torn line, which is what
 * every other check here looks for. The long form cannot be torn — its fences
 * are whole lines — so the things worth checking are different, and all of
 * them are about the marks:
 *
 *   a question with one option is not a question
 *   a question with no + has no right answer, and nothing can be picked
 *   a question with two + has two, and the second is never credited
 *   an = before any option explains nothing
 *   a line with no mark at all is a line the renderer silently drops
 */
const quizBlockTrouble = (content) => {
  const lines = content.split('\n').slice(1, -1)
  const trouble = []

  let question = null
  let seen = false

  const close = () => {
    if (!question) return
    if (question.options < 2) {
      trouble.push({ what: `вариантов ${question.options}, нужно хотя бы 2`, detail: question.text })
    } else if (question.right !== 1) {
      trouble.push({ what: `пометок + у вопроса: ${question.right}, нужна ровно 1`, detail: question.text })
    }
    question = null
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue

    const mark = line[0]
    const text = line.slice(1).trim()

    if ('?+-='.indexOf(mark) === -1) {
      trouble.push({ what: 'строка без пометки ? + - =', detail: line.slice(0, 74) })
      continue
    }

    if (mark === '?') {
      if (!question || question.options) {
        close()
        question = { text: text.slice(0, 74), options: 0, right: 0 }
        seen = true
      }
      if (!text) trouble.push({ what: 'вопрос пустой', detail: line.slice(0, 74) })
      continue
    }

    if (!question) {
      trouble.push({ what: `пометка ${mark} до вопроса`, detail: line.slice(0, 74) })
      continue
    }

    if (mark === '+' || mark === '-') {
      if (!text) {
        trouble.push({ what: `вариант ${mark} пустой`, detail: question.text })
        continue
      }
      question.options++
      if (mark === '+') question.right++
      continue
    }

    // '='
    if (!question.options) {
      trouble.push({ what: 'пояснение = до первого варианта', detail: line.slice(0, 74) })
    }
  }

  close()

  if (!seen) trouble.push({ what: 'блок без вопросов', detail: content.trim().slice(0, 74) })

  return trouble
}

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
  const quizzes = []
  const fixes = []
  const nested = []
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
    if (content.slice(0, TESTS_FENCE.length) === TESTS_FENCE) {
      texts.push(content)
      // A ♣ block inside a ~~~tests fence renders as nothing at all: the
      // fence is lifted out first and createTestSeries reads only →→→ lines,
      // so the questions are silently dropped. The wrapper is not needed —
      // one ♣ block holds as many questions as you give it — but the way the
      // mistake fails gives no hint of that, so it is named here.
      if (content.includes(QUIZ_FENCE)) nested.push(content)
      continue
    }
    if (content.slice(0, QUIZ_FENCE.length) === QUIZ_FENCE) quizzes.push(content)
    if (content.slice(0, FIX_FENCE.length) === FIX_FENCE) fixes.push(content)
  }

  return { texts, quizzes, fixes, nested }
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
  let texts, quizzes, fixes, nested

  try {
    ({ texts, quizzes, fixes, nested } = textOf(fs.readFileSync(file, 'utf8')))
  } catch (error) {
    broken.push({ name, what: 'разбор упал', detail: error.message })
    continue
  }

  for (const block of nested) {
    const first = block.split('\n').find((line) => line.trim().startsWith('?')) || ''
    broken.push({
      name,
      what: 'тест ♣: блок внутри ~~~tests — не отрисуется, фенс лишний',
      detail: first.trim().slice(0, 74)
    })
  }

  for (const fix of fixes) {
    checked++
    for (const trouble of fixBlockTrouble(fix)) {
      broken.push({ name, what: `задание ♠: ${trouble.what}`, detail: trouble.detail })
    }
  }

  for (const quiz of quizzes) {
    checked++
    for (const trouble of quizBlockTrouble(quiz)) {
      broken.push({ name, what: `тест ♣: ${trouble.what}`, detail: trouble.detail })
    }
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

// Only true of a torn line. A ♣ block cannot be torn — its fences are whole
// lines — so what is wrong with one is written in the block itself, and
// pointing at pageRegExpr would send the reader to the wrong file.
const ownFault = (item) => item.what.slice(0, 6) !== 'тест ♣' && item.what.slice(0, 9) !== 'задание ♠'

if (broken.some(ownFault)) {
  console.log('\nОдин из блочных шаблонов в src/configs/pageRegExpr.js захватил больше,')
  console.log('чем должен, и вырезал часть строки вместе со своим блоком.\n')
} else {
  console.log('')
}

process.exit(1)
