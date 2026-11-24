#!/usr/bin/env node
/**
 * Редактор ментальной карты: перетащить блок и сохранить координаты.
 *
 *   npm run map-edit        открыть редактор (http://127.0.0.1:8187/edit)
 *   npm run map-edit -- 9000   на другом порту
 *
 * Карта рисуется из public/maps/course.json, и редактор правит именно этот
 * файл — не копию и не промежуточный формат. Поэтому он не рисует ничего
 * сам: он открывает во фрейме ту же страницу, что видит читатель, и двигает
 * блоки в её данных. Что видно в редакторе, то и будет на сайте.
 *
 * Отсюда и весь сервер: страницу со фреймом нельзя открыть файлом с диска
 * (fetch по file:// запрещён), а записать файл из браузера нечем. Два
 * десятка строк http и один PUT.
 *
 * Ничего из этого не попадает на сайт: редактор лежит в tools/, сервер
 * слушает только 127.0.0.1 и живёт, пока открыто окно терминала.
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')

const root = path.join(__dirname, '..')
const PUBLIC = path.join(root, 'public')
const EDITOR = path.join(__dirname, 'map-editor.html')
const DATA = path.join(PUBLIC, 'maps/course.json')

const port = Number(process.argv[2]) || 8187

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
}

/** Записывается только карта, и только если это разбирается как карта. */
const save = (body, response) => {
  let data
  try {
    data = JSON.parse(body)
  } catch (error) {
    response.writeHead(400).end('не JSON: ' + error.message)
    return
  }

  if (!Array.isArray(data.rings) || !data.outerOrbit) {
    response.writeHead(400).end('это не карта: нет rings или outerOrbit')
    return
  }

  fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n', 'utf8')
  const blocks = data.rings.reduce((n, ring) => n + ring.branches.length, 0)
  console.log(`сохранено: ${data.rings.length} колец, ${blocks} веток, ${new Date().toLocaleTimeString()}`)
  response.writeHead(200).end('ok')
}

const server = http.createServer((request, response) => {
  if (request.method === 'PUT' && request.url === '/maps/course.json') {
    let body = ''
    request.on('data', chunk => { body += chunk })
    request.on('end', () => save(body, response))
    return
  }

  const url = decodeURIComponent(new URL(request.url, 'http://x').pathname)

  if (url === '/' || url === '/edit') {
    response.writeHead(200, { 'Content-Type': types['.html'] })
    response.end(fs.readFileSync(EDITOR))
    return
  }

  // Ничего выше public/ отдавать не нужно, и кэшировать тоже: правка должна
  // быть видна по F5, а не через четыре часа.
  const file = path.join(PUBLIC, path.normalize(url).replace(/^(\.\.[/\\])+/, ''))
  if (!file.startsWith(PUBLIC)) {
    response.writeHead(403).end('нет')
    return
  }

  try {
    response.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    })
    response.end(fs.readFileSync(file))
  } catch {
    response.writeHead(404).end('нет такого файла')
  }
})

server.listen(port, '127.0.0.1', () => {
  const address = `http://127.0.0.1:${port}/edit`
  console.log(`редактор карты: ${address}`)
  console.log(`пишет в: ${path.relative(root, DATA).replace(/\\/g, '/')}`)
  console.log('Ctrl+C — закончить\n')

  // Открыть браузер, если получится; если нет — адрес напечатан выше.
  const open = process.platform === 'win32'
    ? ['cmd', ['/c', 'start', '', address]]
    : process.platform === 'darwin' ? ['open', [address]] : ['xdg-open', [address]]
  execFile(open[0], open[1], () => {})
})
