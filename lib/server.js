
var http = require('http')
  , server


server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world\n");
})

module.exports = server
