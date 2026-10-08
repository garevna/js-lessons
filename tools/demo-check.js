#!/usr/bin/env node
/**
 * Runs the console sessions written in the lessons, and says where an answer
 * disagrees with what the code actually does.
 *
 *   npm run demos            every lesson
 *   npm run demos -- <page>  one
 *
 * A ~~~demo block is a promise about what a console would say. A block copied
 * from the one above it with a value left unchanged makes that promise wrong
 * on a page somebody is learning from — which is how `example(false, null, '0')`
 * came to answer NaN where it prints 0. Nothing else in the build reads these
 * blocks as code.
 *
 * Not everything can be checked. A value the console draws open — an object, a
 * function — has no text to compare against, and a demo that reaches for the
 * page or the network cannot be run at all. Those are counted and left alone.
 */

const fs = require('fs')
const path = require('path')
const util = require('util')
const vm = require('vm')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'content/lessons')

const args = process.argv.slice(2)
const only = args.find((a) => !a.startsWith('--'))

/**
 * The session as written, read into the steps it plays — the same four marks
 * the renderer reads.
 *
 *   > what was typed
 *   < what the console answered
 *   ! what it complained about
 *   ? what it warned about
 *   ... a continuation of the command above
 */
const readSession = (text) => {
  const steps = []
  let open = null

  const start = (shell) => { open = { input: [], answers: [], shell: !!shell }; steps.push(open); return open }
  const answer = (line, level) => { if (!open) start(); open.answers.push({ text: line, level }) }

  for (const raw of text.split('\n')) {
    const line = raw.replace(/\s+$/, '')
    if (!line.trim().length) { open = null; continue }

    const trimmed = line.trimStart()

    if (/^>(\s|$)/.test(trimmed)) {
      const command = trimmed.slice(1).replace(/^ /, '')
      if (!open || open.answers.length || open.shell) start()
      open.input.push(command)
      continue
    }

    // A continuation of the command above, written the way node prompts for
    // one, so a session can be copied out of a terminal unchanged.
    if (/^\.\.\.(\s|$)/.test(trimmed)) {
      if (!open || open.answers.length) start()
      open.input.push(trimmed.slice(3).replace(/^ /, ''))
      continue
    }

    // A line typed at the shell, not at the REPL. It is not JavaScript and
    // there is nothing here that could run it.
    if (/^\$(\s|$)/.test(trimmed)) {
      if (!open || open.answers.length || open.input.length) start(true)
      open.shell = true
      open.input.push(trimmed.slice(1).replace(/^ /, ''))
      continue
    }

    if (/^<(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).replace(/^ /, ''), null); continue }
    if (/^!(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).trim(), 'error'); continue }
    if (/^\?(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).trim(), 'warning'); continue }

    answer(trimmed, null)
  }

  return steps
}

/**
 * What the browser would say, against what the lesson says it says.
 *
 * A console answers twice over: whatever the code printed, and then the value
 * of the expression. A function that console.logs its arguments shows the
 * printed line and `undefined` under it.
 */
const check = (context, step) => {
  const source = step.input.join('\n')
  if (!source) return { skipped: true }

  context.__printed.length = 0

  let value
  try {
    value = vm.runInContext(source, context)
  } catch (error) {
    // A demo that reaches for the page or the network cannot be run here, and
    // an error the lesson meant to show is not a fault either.
    return { skipped: true, why: error.message }
  }

  // What the lesson shows as a complaint or a warning is not the value the
  // expression returned, so there is nothing here to compare it against. Nor
  // is a line typed at the shell something this could run.
  if (step.shell) return { skipped: true }
  if (!step.answers.length || step.answers.some((a) => a.level)) return { skipped: true }

  // A value the console draws open — ƒ with its source, ► with its properties
  // — has no single line to compare against.
  if (step.answers.some((a) => /^[ƒ►▼]/.test(a.text))) return { skipped: true }

  /*
   * The forms a lesson may have written the value in.
   *
   * util.inspect first, because that is the one node prints: a ~~~bash session
   * showing `User { name: 'Piter', getStatus: [Function (anonymous)] }` was
   * reported as a mismatch against [object Object], which is what String gives
   * for every object alike. The lesson was right and this was not reading it.
   * String stays for the browser sessions, where it is what console.log shows.
   */
  const asValue = (v) => typeof v === 'string'
    ? [`'${v}'`, `"${v}"`, v]
    : [util.inspect(v), String(v)]

  const answers = step.answers.map((a) => a.text)
  const printed = context.__printed

  // Spacing is the author's: console.log('a: ', b) puts its own blank between
  // the arguments, and a lesson may have written one or two.
  const loose = (s) => String(s).replace(/\s+/g, '')

  if (printed.length) {
    const expected = [...printed, String(value)]
    const agrees = answers.every((answer, i) =>
      loose(answer) === loose(expected[i]) || (i === answers.length - 1 && asValue(value).includes(answer)))
    return { agrees, shown: expected.join(' | '), recorded: answers.join(' | ') }
  }

  return { agrees: asValue(value).includes(answers[0]), shown: asValue(value)[0], recorded: answers[0] }
}

const pages = fs.readdirSync(LESSONS)
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''))
  .filter((page) => !only || page === only)

let blocks = 0
let commands = 0
let skipped = 0
let wrong = 0

for (const page of pages) {
  const file = path.join(LESSONS, `${page}.md`)
  const text = fs.readFileSync(file, 'utf8')

  // ~~~bash is the same session in a terminal, and this runs its commands in
  // node already — so those are the ones it can speak for most exactly.
  const found = [...text.matchAll(/~~~(?:demo|bash)[^\n]*\n([\s\S]*?)\n~~~/g)]
  if (!found.length) continue

  const said = []

  for (const [whole, body] of found) {
    blocks++

    const steps = readSession(body)
    const printed = []
    const context = vm.createContext({
      __printed: printed,
      console: { log (...list) { printed.push(list.map((a) => typeof a === 'string' ? a : String(a)).join(' ')) } }
    })

    const line = text.slice(0, text.indexOf(whole)).split('\n').length

    for (const step of steps) {
      if (!step.input.length) continue
      commands++

      const result = check(context, step)
      if (result.skipped) { skipped++; continue }
      if (result.agrees) continue

      wrong++
      said.push(`  строка ${line}:  ${step.input.join(' ').slice(0, 64)}`)
      said.push(`      записано:   ${result.recorded}`)
      said.push(`      получается: ${result.shown}`)
    }
  }

  if (said.length) { console.log(`\n${page}`); for (const s of said) console.log(s) }
}

console.log(`\n${blocks} демо, ${commands} команд: ${commands - skipped - wrong} сошлись, ${skipped} не проверить, ${wrong} расходятся\n`)

process.exit(wrong ? 1 : 0)
