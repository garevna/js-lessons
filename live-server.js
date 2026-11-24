/**
 * The dev server, plus a repair to the client it injects.
 *
 * live-server puts a script into every page it serves, and that script opens
 * one WebSocket and never opens another. It has no onclose. So the moment the
 * server restarts — an edit to this file, a crash, a machine waking up — every
 * tab that was already open goes quietly deaf. The page keeps working, the
 * watcher keeps rebuilding in tens of milliseconds, and nothing at all reaches
 * the screen. It reads exactly like the build having become very slow, and the
 * only cure is a reload nobody knows to make.
 *
 * INJECTED_CODE is read once, at require time, from a file inside the package,
 * so the file is repaired here before live-server is loaded. It is rewritten
 * only when it differs, and it repairs itself again after npm install.
 *
 * The client is built with a String.raw tag. A plain template literal eats the
 * backslashes in the one regex it carries, which turned /(&|\?)…\d+/ into
 * /(&|?)…d+/ — not a regex at all. The whole script then failed to parse and
 * the page had no live reload of any kind, which is worse than the fault being
 * repaired here.
 */
const fs = require('fs')
const net = require('net')
const path = require('path')

// PORT=8182 npm start runs a second copy without disturbing the first.
const PORT = Number(process.env.PORT) || 8181

const INJECTED = path.join(__dirname, 'node_modules/live-server/injected.html')

/**
 * Refuse to start quietly on a port nobody asked for.
 *
 * live-server does not stop when 8181 is taken — it picks a free port at
 * random and says so in a line that scrolls away. A second server then runs
 * on, say, 61050, watching the same public/ as the first, while the browser
 * at localhost:8181 is being served by whichever one got there first. Two
 * servers, two file watchers, and edits arriving from the wrong one.
 *
 * It is the same fault the watcher's lock was written for, and the same cure:
 * say who is already there and stop.
 */
const portIsFree = (port, host) => new Promise((resolve, reject) => {
  const probe = net.createServer()
  probe.once('error', (error) => error.code === 'EADDRINUSE' ? resolve(false) : reject(error))
  probe.once('listening', () => probe.close(() => resolve(true)))
  probe.listen(port, host)
})

/** The stock client, plus onclose, plus a reload once the socket comes back. */
const CLIENT = String.raw`<!-- Code injected by live-server -->
<script type="text/javascript">
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function() {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					head.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					head.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var connectedBefore = false;
			function connect() {
				var socket = new WebSocket(address);
				var retried = false;
				function retry() {
					if (retried) return;
					retried = true;
					setTimeout(connect, 500);
				}
				socket.onopen = function() {
					// Back after the server went away: whatever changed while
					// the socket was down never arrived, so take the page fresh.
					if (connectedBefore) { window.location.reload(); return; }
					connectedBefore = true;
					console.log('Live reload enabled.');
				};
				socket.onmessage = function(msg) {
					if (msg.data == 'reload') window.location.reload();
					else if (msg.data == 'refreshcss') refreshCSS();
				};
				socket.onclose = retry;
				socket.onerror = function() { try { socket.close() } catch (e) { retry() } };
			}
			connect();
		})();
	}
	// ]]>
</script>
`

try {
	if (fs.readFileSync(INJECTED, 'utf8') !== CLIENT) {
		fs.writeFileSync(INJECTED, CLIENT)
		console.log('  клиент live-server заменён: теперь переподключается после перезапуска сервера')
	}
} catch (error) {
	console.log('  не удалось починить клиент live-server: ' + error.message)
	console.log('  вкладки переживут перезапуск сервера только после ручной перезагрузки')
}

var liveServer = require('live-server')

/**
 * Does the tab reload itself when the watcher has rebuilt something?
 *
 * Yes, by default: the pair is meant to be left alone — save in the editor,
 * look at the browser. The watcher writes into public/, live-server sees the
 * write and the tab takes itself fresh; nothing has to be refreshed by hand.
 *
 * It was off for a while. With an editor that saved on a timer it meant the tab
 * was restarted about once a second for as long as a paragraph was being typed,
 * which is unusable. That editor is on Ctrl+S now, so a save is a deliberate
 * gesture and reloading on it is the right answer again.
 *
 *   RELOAD=off npm start
 *
 * turns it back off for the cases where it is still wrong — reading a long
 * lesson while someone else edits it, or debugging something that only exists
 * after a few clicks and would be lost on a reload.
 */
const RELOAD_ON_CHANGE = process.env.RELOAD !== 'off'

/**
 * Карта курса правится в браузере и сохраняется сюда.
 *
 * На 127.0.0.1 на карте появляется кнопка «Редактировать» (maps/course-edit.js);
 * сохранение — это PUT на тот же адрес, с которого карта прочитана. Писать
 * его некому, кроме того, кто страницу отдал, — то есть этого сервера.
 *
 * Пишется только карта и только если присланное разбирается как карта: это
 * localhost, но открытая наружу дырка в файловую систему никому не нужна.
 */
const COURSE_MAP = path.join(__dirname, 'public/maps/course.json')

function saveTheMap (request, response, next) {
	if (request.method !== 'PUT' || request.url.split('?')[0] !== '/maps/course.json') return next()

	let body = ''
	request.on('data', chunk => { body += chunk })
	request.on('end', () => {
		try {
			const data = JSON.parse(body)
			if (!Array.isArray(data.rings) || !data.outerOrbit) throw new Error('это не карта')

			fs.writeFileSync(COURSE_MAP, JSON.stringify(data, null, 2) + '\n', 'utf8')
			console.log(`  карта курса сохранена, ${new Date().toLocaleTimeString()}`)
			response.writeHead(200).end('ok')
		} catch (error) {
			response.writeHead(400).end(error.message)
		}
	})
}

var params = {
	port: PORT,
	host: '0.0.0.0',
	root: 'public',
	open: false,

	// Nothing watched means nothing to reload for: live-server only ever sends
	// the tab a reload from a file event, so with no paths the page is left
	// alone. An empty array is a list of paths, not an absent option, so the
	// root is not filled in behind it.
	watch: RELOAD_ON_CHANGE ? ['public'] : [],

	// How long to keep collecting changes before reloading the tab.
	//
	// It was a whole second, then a quarter of one. Both were guesses at how
	// long a build takes to write its files. Measured: editing one lesson
	// rewrites exactly one file — the builder is per-language and writes only
	// what changed — so there is nothing to collect, and the whole wait was
	// dead time in front of every single edit.
	//
	// What is left is only a guard: long enough that the tab never fetches a
	// lesson mid-write, short enough not to be felt.
	wait: 100,

	// Two files describe the content rather than being it: which pages exist,
	// and what version each resource is at. The page reads both fresh every
	// time it loads, so a reload triggered by them shows nothing new — and
	// they are rewritten a moment after every lesson is rebuilt, which turned
	// one edit into a second needless reload.
	//
	// Regexes rather than names: chokidar matches against the full path.
	//
	// course.json — по той же причине, но с другой стороны: его пишет сама
	// открытая страница, и перезагрузка в ответ на собственное сохранение
	// стирала бы правку, которая ещё в работе.
	ignore: [/versions\.json$/, /lessons[\/]index\.json$/, /[\\/]\.cache[\\/]/, /maps[\\/]course\.json$/],

	logLevel: 2,
	middleware: [saveTheMap]
}

portIsFree(PORT, params.host).then((free) => {
	if (free) {
		liveServer.start(params)

		console.log(RELOAD_ON_CHANGE
			? '  вкладка перезагружается сама, как только вотчер что-то пересобрал\n' +
			  '  (не надо — запусти так:  RELOAD=off npm start)'
			: '  вкладка сама не перезагружается — обнови её, когда захочешь увидеть правку\n' +
			  '  (вернуть авто-перезагрузку: npm start без RELOAD=off)')

		// This serves public/ and nothing else: it does not build. An edit in
		// src/ or content/ changes nothing on screen until the watcher runs,
		// and the usual way to lose half an hour here is to have only this
		// half of the pair running.
		console.log('  рядом, в другом терминале:  npm run watch   →  пересборка при правках')
		console.log('  что ещё умеет проект:       npm run help')

		return
	}

	console.log(`
  Порт ${PORT} уже занят — сервер не запускаю.

  live-server на моём месте взял бы случайный свободный порт и работал бы
  вторым: два сервера следят за одним public/, а вкладка на localhost:${PORT}
  обслуживается тем, кто встал первым.

  Кто держит порт:

      netstat -ano | findstr :${PORT}

  и дальше по номеру процесса из последней колонки:

      taskkill /PID <номер> /F
`)

	process.exit(1)
})
