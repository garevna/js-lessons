#!/usr/bin/env node
/**
 * Карта курса с правкой — без всего остального приложения.
 *
 *   npm run map-edit           открыть карту (http://127.0.0.1:8187/maps/course.html)
 *   npm run map-edit -- 9000   на другом порту
 *
 * Правит карту сама страница: на 127.0.0.1 у неё есть кнопка «Редактировать»
 * (public/maps/course-edit.js), блок тянется мышью, Ctrl+S шлёт PUT на
 * course.json. Здесь — только отдать файлы и принять этот PUT.
 *
 * То же самое умеет npm start: если приложение уже запущено, отдельный
 * сервер не нужен, карта правится прямо в нём. Этот — для случая, когда
 * хочется только карту и ничего больше: он ничего не следит, не
 * перезагружает вкладку и не собирает.
 *
 * Ничего из этого не попадает на сайт: сервер слушает только 127.0.0.1,
 * живёт, пока открыт терминал, а course-edit.js подключается лишь на
 * локальном адресе.
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')

const root = path.join(__dirname, '..')
const PUBLIC = path.join(root, 'public')
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
  const branches = data.rings.reduce((n, ring) => n + ring.branches.length, 0)
  console.log(`сохранено: ${data.rings.length} колец, ${branches} веток, ${new Date().toLocaleTimeString()}`)
  response.writeHead(200).end('ok')
}

const server = http.createServer((request, response) => {
  if (request.method === 'PUT' && request.url.split('?')[0] === '/maps/course.json') {
    let body = ''
    request.on('data', chunk => { body += chunk })
    request.on('end', () => save(body, response))
    return
  }

  const url = decodeURIComponent(new URL(request.url, 'http://x').pathname)
  const asked = url === '/' ? '/maps/course.html' : url

  // Ничего выше public/ отдавать не нужно, и кэшировать тоже: правка должна
  // быть видна по F5, а не через четыре часа.
  const file = path.join(PUBLIC, path.normalize(asked).replace(/^(\.\.[/\\])+/, ''))
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
  const address = `http://127.0.0.1:${port}/maps/course.html`
  console.log(`карта курса: ${address}`)
  console.log('кнопка «Редактировать» — в правом верхнем углу')
  console.log(`пишет в: ${path.relative(root, DATA).replace(/\\/g, '/')}`)
  console.log('Ctrl+C — закончить\n')

  // Открыть браузер, если получится; если нет — адрес напечатан выше.
  const open = process.platform === 'win32'
    ? ['cmd', ['/c', 'start', '', address]]
    : process.platform === 'darwin' ? ['open', [address]] : ['xdg-open', [address]]
  execFile(open[0], open[1], () => {})
})
