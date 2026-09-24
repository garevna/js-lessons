var liveServer = require('live-server')

var params = {
	port: 8181,
	host: '0.0.0.0',
	root: 'public',
	open: false,

	// How long to keep collecting changes before reloading the tab. It is there
	// so that a build writing several files reloads once instead of three
	// times — a quarter of a second is long enough for that, and a whole
	// second was a whole second added to every single edit.
	wait: 250,

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
