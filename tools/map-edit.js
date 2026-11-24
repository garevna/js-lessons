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
const { mapServer, FILE: DATA } = require('./map-server')

const root = path.join(__dirname, '..')
const PUBLIC = path.join(root, 'public')

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

const server = http.createServer((request, response) => {
  // Запись и выкладывание — те же, что у npm start: tools/map-server.js.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    mapServer(request, response)
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

  // Сначала прочитать, потом отвечать. Наоборот — заголовки уже отправлены,
  // и на отсутствующий файл (favicon, например) ответ 404 не влезает:
  // ERR_HTTP_HEADERS_SENT роняет весь сервер, а выглядит это как «не
  // запускается», потому что падает он в первую же секунду.
  let body
  try {
    body = fs.readFileSync(file)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('нет такого файла')
    return
  }

  response.writeHead(200, {
    'Content-Type': types[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store'
  })
  response.end(body)
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
