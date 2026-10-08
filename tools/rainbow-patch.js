#!/usr/bin/env node
/**
 * Takes # out of the comment rule in public/rainbow.js.
 *
 *   npm run rainbow            patch it if it needs patching
 *   npm run rainbow -- --check say whether it is patched, and fail if not
 *
 * Rainbow's generic language — the one every other language falls back on —
 * reads # as the start of a line comment. It is one in Python, in Ruby, in a
 * shell. ES2022 gave JavaScript the same character for the opposite meaning,
 * and every #private in the course was greyed out from the hash to the end of
 * the line, taking the rest of the line with it.
 *
 * Adding a pattern for #name is not enough on its own. Where two patterns
 * start at the same place Rainbow keeps the longer match, so `#status` alone
 * was won by the new rule and `this.#status = status` was still won by the
 * comment. And extend() only ever adds patterns; there is no way to replace
 * one through the API.
 *
 * So the rule itself is edited, here rather than by hand, so that it is
 * described, repeatable, and checkable in CI. None of the languages this
 * course highlights — javascript, html, css, json — has a # comment.
 */

const fs = require('fs')
const path = require('path')

const FILE = path.join(__dirname, '../public/rainbow.js')

const check = process.argv.includes('--check')

/** The generic comment rule as Rainbow ships it, and without the # branch. */
const BEFORE = String.raw`pattern:/\/\*[\s\S]*?\*\/|(\/\/|\#)(?!.*('|").*?[^:](\/\/|\#)).*?$/gm`
const AFTER = String.raw`pattern:/\/\*[\s\S]*?\*\/|(\/\/)(?!.*('|").*?[^:](\/\/)).*?$/gm`

const source = fs.readFileSync(FILE, 'utf8')

const has = source.includes(BEFORE)
const done = source.includes(AFTER)

if (check) {
  if (done && !has) {
    console.log('\n  public/rainbow.js: # больше не считается комментарием\n')
    process.exit(0)
  }
  console.log('\n  public/rainbow.js: # всё ещё начинает комментарий — запусти npm run rainbow\n')
  process.exit(1)
}

if (!has) {
  console.log(done
    ? '\n  public/rainbow.js уже поправлен\n'
    : '\n  В public/rainbow.js не нашёл правила комментария в ожидаемом виде.\n  Похоже, библиотеку обновили — посмотри глазами.\n')
  process.exit(done ? 0 : 1)
}

fs.writeFileSync(FILE, source.split(BEFORE).join(AFTER))

console.log('\n  public/rainbow.js: # убран из правила комментария')
console.log('  Теперь #private — это свойство, а не комментарий.\n')
