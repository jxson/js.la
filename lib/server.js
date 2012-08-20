
var http = require('http')
  , routes = require('./routes/index.js')
  , server

server = http.createServer(function(req, res) {
  res.setHeader("Content-Type", "text/html")
  res.writeHead(200);
  res.end("hello world from JSLA\n");
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
