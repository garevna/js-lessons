#!/usr/bin/env node
/**
 * Moves the version the site shows in its footer.
 *
 *   npm run bump fix          2.1.4 -> 2.1.5
 *   npm run bump translation  2.1.4 -> 2.2.0
 *   npm run bump change       2.1.4 -> 2.2.0
 *   npm run bump lesson       2.1.4 -> 3.0.0
 *   npm run bump update       2.1.4 -> 3.0.0
 *
 * The number used to be major.minor by hand and the patch taken from the
 * commit count, so it read 2.0.114 and would have gone on climbing — a hundred
 * and fourteen is not a number anybody wanted to publish, and it said nothing
 * about what had changed. The whole version is declared now, in
 * service-worker/package.json, and moves only when one of these words is said.
 *
 * Which word, by what was done:
 *
 *   a bug fixed, styles touched      fix
 *   a page translated                translation
 *   anything more serious            change
 *   a lesson or a topic added        lesson
 *   a large update                   update
 *
 * Neither of the lower two numbers ever reaches ten: the tenth small fix is a
 * step of its own and becomes 2.2.0, the tenth of those becomes 3.0.0. So both
 * stay single digits.
 *
 * Nothing moves on its own, so a day of local work leaves the number where it
 * was; the bump is said once, when the work is ready to go out.
 */

const fs = require('fs')
const path = require('path')

const FILE = path.join(__dirname, '../service-worker/package.json')

/** The last number never reaches this: the tenth small fix moves the middle one. */
const ROLLOVER = 10

/** Each word, what it means, and which part of the number it moves. */
const WORDS = {
  fix: { part: 'patch', why: 'исправление, правка стилей' },
  translation: { part: 'minor', why: 'переведена страница' },
  change: { part: 'minor', why: 'заметная правка' },
  lesson: { part: 'major', why: 'новый урок или новая тема' },
  update: { part: 'major', why: 'масштабный апдейт' }
}

/**
 * The version after a step, carried.
 *
 * A bigger part moving sets the smaller ones back to nothing, and neither of
 * the two lower numbers ever reaches ROLLOVER: ten small fixes amount to a
 * step of their own and become one of the middle, ten of those become one of
 * the first. So the last two numbers stay single digits, and 2.0.114 cannot
 * happen again.
 */
const step = (version, part) => {
  let [major, minor, patch] = version.split('.').map(Number)

  if (part === 'major') { major += 1; minor = 0; patch = 0 }
  else if (part === 'minor') { minor += 1; patch = 0 }
  else patch += 1

  if (patch >= ROLLOVER) { patch = 0; minor += 1 }
  if (minor >= ROLLOVER) { minor = 0; major += 1 }

  return `${major}.${minor}.${patch}`
}

const usage = () => {
  const declared = JSON.parse(fs.readFileSync(FILE, 'utf8')).version

  const next = {
    patch: step(declared, 'patch'),
    minor: step(declared, 'minor'),
    major: step(declared, 'major')
  }

  console.log(`\n  Сейчас: ${declared}\n`)
  console.log('  слово          станет     когда говорить')
  console.log('  ' + '-'.repeat(60))
  for (const [word, { part, why }] of Object.entries(WORDS)) {
    console.log('  ' + word.padEnd(15) + next[part].padEnd(11) + why)
  }
  console.log('\n  npm run bump <слово>\n')
}

const word = process.argv[2]

if (!word) { usage(); process.exit(0) }

if (!WORDS[word]) {
  console.log(`\n  Не знаю слова "${word}".`)
  usage()
  process.exit(1)
}

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))
const [major, minor, patch] = data.version.split('.').map(Number)

if ([major, minor, patch].some((n) => !Number.isInteger(n))) {
  console.log(`\n  В ${path.relative(process.cwd(), FILE)} версия записана как "${data.version}" — ожидались три числа через точку.\n`)
  process.exit(1)
}

const { part, why } = WORDS[word]
const version = step(data.version, part)

data.version = version
fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n')

console.log(`\n  ${data.name || 'service-worker'}: ${major}.${minor}.${patch}  ->  ${version}   (${why})`)
console.log('\n  Файл с номером для страницы перепишет сборка — он собирается из этого.')
console.log('  Посмотреть, ничего не собирая:  npm run sw-identity -- --force\n')
