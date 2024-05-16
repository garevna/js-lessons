var liveServer = require('live-server')

var params = {
	port: 8181,
	host: '0.0.0.0',
	root: 'public',
	open: false,
	wait: 1000,
	logLevel: 2,
	middleware: [function(req, res, next) { next() }]
}

liveServer.start(params)
