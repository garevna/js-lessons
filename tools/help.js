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
    ['full', 'собрать всё — нужен редко, см. внизу']
  ]],

  ['Страницы', [
    ['lessons', 'собрать public/lessons из content/'],
    ['lessons:check', 'сверить собранное с content/, ничего не записывая'],
    ['content', 'уроки + реестр страниц + карта версий, без вебпака'],
    ['workers', 'прогнать собранные воркеры: меню, урок, поиск, кэш'],
    ['blocks', 'не съедает ли блочный шаблон лишнего в строках'],
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
    ['keywords', 'черновик ключевых слов урока  (--all, <page>)'],
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
    текст урока            npm run lessons -- <page>   0,1 с
    все уроки сразу        npm run lessons             0,5 с на все 163
    новая или переведённая npm run content             1,5 с, вебпак не нужен
    структура страницы     npm run extract -- <page> --write, потом npm run lessons
    что-то в src/          npm run prod                ~1,5 с
    иконка                 npm run full                ~9 с

  Страницы в бандлы не попадают. Уроки браузер читает прямо из
  public/lessons, а два файла — lessons/index.json (какие страницы есть
  и на каких языках) и versions.json (версия каждого ресурса) — воркеры
  тоже забирают по сети. Поэтому правка контента не трогает ни один
  бандл, и пересобирать проект ради неё незачем.

  Версия сервис-воркера локально не меняется. Это счётчик коммитов, и
  ставит его деплой — иначе каждая локальная пересборка клала бы в дифф
  src/configs/serviceWorkerVersion.js и вместе с ним public/index.js.
  Если всё-таки нужно проставить вручную:

      node service-worker/config-service-worker.js --identity --force

  Домашки сейчас спрятаны — все 21 пункт. В mainMenu.js они на месте, со
  своим порядком, просто помечены hidden: true, и воркер их в меню не
  показывает. Страницы никуда не делись и открываются по своему адресу.
  Вернуть одну — убрать у неё этот флаг и пересобрать воркер.
  Что спрятано, покажет npm run orphans.
`)
