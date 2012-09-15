
var cluster = require('cluster')
  , server = require('./server')
  , name

name = function(worker){
  return 'worker ' + worker.process.pid
}

module.exports.run = function(options){
  var options = options || {}

  cluster.on('fork', function(worker){
    console.log(name(worker), '- forked')
  })

  cluster.on('online', function(worker){
    console.log(name(worker), '- online')
  })

  cluster.on('listening', function(worker, address){
    var url = 'http://' + address.address + ':' + address.port

    console.log(name(worker), '- listening on', url)
  })

  cluster.on('exit', function(worker, code, signal) {
    console.log(name(worker), 'died (' + code + ') - restarting')

     cluster.fork()
  })

  if (cluster.isMaster) {
    console.log('master', process.pid)
    for (var i = 0; i < options.workers; i++) cluster.fork()
  } else {
    server.listen(options.port, options.host)
  }
}
