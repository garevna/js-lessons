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
const path = require('path')

const INJECTED = path.join(__dirname, 'node_modules/live-server/injected.html')

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

var params = {
	port: 8181,
	host: '0.0.0.0',
	root: 'public',
	open: false,

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
	ignore: [/versions\.json$/, /lessons[\/]index\.json$/],

	logLevel: 2,
	middleware: [function(req, res, next) { next() }]
}

liveServer.start(params)
