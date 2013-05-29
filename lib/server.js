
var http = require('http')
  , bunyan = require('bunyan')

module.exports = http.createServer(handler)

module.exports.logger = bunyan.createLogger({ name: 'jsla'
, level: 'warn'
, serializers: { req: bunyan.stdSerializers.req
  , res: bunyan.stdSerializers.res
  , err: bunyan.stdSerializers.err
  , error: bunyan.stdSerializers.err
  }
})

function handler(req, res){
  var server = this
    , crypto = require('crypto')
    , id = crypto.randomBytes(6).toString('hex')

  // easier debugging
  res.setHeader('x-request-id', id)
  req.started = (new Date).getTime()

  req.log = res.log = server.logger.child({ 'request-id': id })

  req.log.info({ req: req }, 'request started')

  // wrap up a finished request with a log
  res.on('finish', function(){
    res.finished = (new Date).getTime()
    res.latency = res.finished - req.started

    // Kinda bad form but I couldn't find a good way to check for
    // headers having been flushed. If `res.setHeader(...)` gets
    // called once headers have been sent things will blow up.
    if (!res._headerSent) {
      res.setHeader('x-response-time', res.latency)
    }

    // Only gets added to chunked responses.
    res.addTrailers({ 'x-response-time': res.latency })

    req.log.info({ res: res, req: req }, 'response sent')
  })

  // decorators
  // TODO: make these separate methods
  res.json = function(data, status, headers){
    var data = JSON.stringify(data)
      , headers = headers || {}

    // It's possible to have a json based content-type so don't
    // override if it's already set
    headers['content-type'] = headers['content-type'] || 'application/json'

    res.send(data, status, headers)
  }

  res.send = function(data, status, headers){
    var data = data || ''
      , status =  status || res.statusCode
      , headers = headers || {}
      , Buffer = require('buffer').Buffer
      , data = Buffer.isBuffer(data) ? data : new Buffer(data)

    res.statusCode = status

    Object.keys(headers).forEach(function(key){
      res.setHeader(key, headers[key])
    })

    res.setHeader('content-length', data.length)

    res.end(data)
  }

  // Decorate res with an res.error handler
  var EP = require('error-page')

  res.error = EP(req, res, { debug: false
  , '*': error
  })

  // routing setup
  var url = require('url')
    , pathname = url.parse(req.url).pathname
    , router = require('./router')
    , route = router.match(pathname)

  // bail if there is a missing route
  if (!route) return res.error(404)

  // Merge the route's keys onto the request object
  for (var k in Object.keys(route)) { req[k] = route[k] }

  // fire the route
  route.fn(req, res)
}

function error(req, res, data){
  if (data.code >= 500) {
    res.log.error({ err: data.error }, '5XX error :(')
  }

  res.json({ 'request-id': res.getHeader('x-request-id')
  , code: data.code
  , url: req.url
  , date: new Date()
  }, data.code)
}
