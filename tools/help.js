#!/usr/bin/env node
/**
 * What the scripts do.
 *
 *   npm run help
 *
 * `npm run` alone lists the names; this says what each one is for, which is
 * the part that is hard to remember three weeks later.
 */

const groups = [
  ['Каждый день', [
    ['start', 'раздаёт public/ на localhost:8181 и перезагружает вкладку'],
    ['watch', 'пересобирает страницу, как только меняется content/'],
    ['dev', 'вебпак в режиме слежения — для правок в src/'],
    ['full', 'собрать всё: уроки, воркеры, бандлы, карту версий']
  ]],

  ['Страницы', [
    ['lessons', 'собрать public/lessons из content/'],
    ['lessons:check', 'сверить собранное с content/, ничего не записывая'],
    ['extract <page> --write', 'разобрать страницу на скелет и сообщения']
  ]],

  ['Перевод', [
    ['i18n', 'что переведено, что нет  (-- --next, --todo, --done)'],
    ['i18n:check', 'найти переводы, не совпадающие со своим оригиналом'],
    ['export <page> <lang>', 'выгрузить непереведённое для DeepL  (--all, --phrases)'],
    ['import <page> <lang>', 'забрать перевод обратно, с проверками'],
    ['phrases', 'пересобрать справочник повторяющихся фраз'],
    ['dedupe', 'вынести повторы из страниц в справочник  (--write)'],
    ['repair', 'найти переводы под чужими ключами  (--write)']
  ]],

  ['Ссылки', [
    ['links', 'проверить все ссылки  (-- --net чтобы спросить адреса)'],
    ['orphans', 'страницы, до которых нельзя дойти, и пункты меню в никуда'],
    ['order', 'ссылки на уроки, которые идут позже'],
    ['areas', 'области курса: черновик разметки  (--write)'],
    ['links:translated', 'найти переведённые версии внешних страниц  (--write)'],
    ['api-host <url>', 'перенастроить уроки на другой адрес песочницы  (--write)']
  ]],

  ['Разметка', [
    ['console-headers', 'подписи над блоками ~~~console: что лишнее  (--write)'],
    ['black-blocks', 'многострочные ••…<br />…•• -> блок ••••  (--write)'],
    ['sort-messages', 'вернуть ключам порядок страницы  (--write)'],
    ['bare-fragments', 'вынести форматирование из таблицы фрагментов  (--write)'],
    ['black-fragments', 'вернуть ключи ⟦fN⟧ в чёрные блоки  (--write)']
  ]]
]

const width = Math.max(...groups.flatMap(([, rows]) => rows.map(([name]) => name.length)))

console.log('')
for (const [title, rows] of groups) {
  console.log(`  ${title}`)
  for (const [name, what] of rows) console.log(`    npm run ${name.padEnd(width)}  ${what}`)
  console.log('')
}

console.log(`  Аргументы после -- :  npm run export -- var eng
  Без -- npm отдаст их себе, а не скрипту, и команда молча сделает не то.

  Что делать после правки:
    сообщение или скелет   npm run lessons
    структура страницы     npm run extract -- <page> --write, потом npm run lessons
    что-то в src/          npm run prod
    новая страница, иконка npm run full
`)
