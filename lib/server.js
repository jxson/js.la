
var http = require('http')
  , url = require('url')
  , router = require('./router')
  , haiku = require('./haiku')
  , server

server = http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname
    , route = router.match(pathname)

  response.error = function error(code){
    response.setHeader('content-type', 'text/html')
    response.writeHead(code)
    response.end('Error')
  }

  request.haiku = haiku

  if (!route) return response.error(404)

  // Merge the route's keys to the request object
  Object.keys(route).forEach(function(key){
    request[key] = route[key]
  })

  route.fn(request, response)
})

server.on('listening', function(){
  var address = server.address()
    , host = (address.address === '0.0.0.0') ? 'localhost' : address.address

  server.url =  [ 'http://'
                , host
                , ':'
                , address.port
                ].join('')
})

module.exports = server
