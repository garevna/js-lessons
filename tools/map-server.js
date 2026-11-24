/**
 * Две вещи, которые локальный сервер делает для карты: записать и выложить.
 *
 * Обе нужны и npm start, и npm run map-edit, и обе не должны жить в двух
 * экземплярах — поэтому они здесь, а оба сервера их подключают.
 *
 *   PUT  /maps/course.json   записать карту в public/maps/course.json
 *   POST /maps/publish       закоммитить этот файл и запушить
 *
 * Почему не хранить карту на сервере, раз уж правка идёт в браузере: тогда
 * у неё не будет истории. Карту переставляют подолгу и не с первого раза, и
 * «вернуть как было во вторник» — это git, а не база. Выкладывание отсюда
 * убирает единственное, что в этом было неудобно, — руками набранный пуш.
 */

const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')

const root = path.join(__dirname, '..')
const MAP = 'public/maps/course.json'
const FILE = path.join(root, MAP)

const answer = (response, status, text) => {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' })
  response.end(text)
}

const body = (request) => new Promise(resolve => {
  let text = ''
  request.on('data', chunk => { text += chunk })
  request.on('end', () => resolve(text))
})

/** Записывается только карта и только если присланное разбирается как карта. */
const save = async (request, response) => {
  let data
  try {
    data = JSON.parse(await body(request))
  } catch (error) {
    return answer(response, 400, 'не JSON: ' + error.message)
  }

  if (!Array.isArray(data.rings) || !data.outerOrbit) {
    return answer(response, 400, 'это не карта: нет rings или outerOrbit')
  }

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8')
  const branches = data.rings.reduce((n, ring) => n + ring.branches.length, 0)
  console.log(`  карта сохранена: ${data.rings.length} колец, ${branches} веток, ${new Date().toLocaleTimeString()}`)
  answer(response, 200, 'ok')
}

const git = (args) => new Promise((resolve, reject) => {
  execFile('git', args, { cwd: root, maxBuffer: 1 << 24 }, (error, out, err) => {
    if (error) reject(new Error((err || out || error.message).trim()))
    else resolve((out || err).trim())
  })
})

/**
 * Коммит одного файла и пуш.
 *
 * Именно одного: в рабочей копии почти всегда есть что-то ещё, и выкладывать
 * вместе с картой чужую недоделанную правку — последнее, чего здесь хотят.
 * git commit <путь> берёт файл из рабочей копии мимо индекса, так что
 * заодно ничего не утащит и из того, что уже добавлено в индекс.
 */
const publish = async (request, response) => {
  try {
    const changed = await git(['status', '--porcelain', '--', MAP])
    if (!changed) return answer(response, 200, 'нечего выкладывать: карта уже такая, как в репозитории')

    const stamp = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    await git(['commit', '-q', '-m', `Карта курса: блоки переставлены (${stamp})`, '--', MAP])
    const where = await git(['rev-parse', '--abbrev-ref', 'HEAD'])
    await git(['push', 'origin', where])

    const head = await git(['rev-parse', '--short', 'HEAD'])
    console.log(`  карта выложена: ${head} → ${where}`)
    answer(response, 200, `ok ${head}`)
  } catch (error) {
    console.log('  выложить не удалось: ' + error.message)
    answer(response, 500, error.message.split('\n')[0] || 'git не справился')
  }
}

/** Connect-совместимая прослойка: подходит и live-server, и своему http. */
function mapServer (request, response, next) {
  const url = request.url.split('?')[0]

  if (request.method === 'PUT' && url === '/maps/course.json') return save(request, response)
  if (request.method === 'POST' && url === '/maps/publish') return publish(request, response)

  return next ? next() : answer(response, 404, 'нет такого')
}

module.exports = { mapServer, MAP, FILE }
