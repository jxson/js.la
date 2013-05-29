
module.exports = function(req, res) {
  res.json({ pid: process.pid
  , memory: process.memoryUsage()
  , uptime: process.uptime()
  , connections: req.client.server.connections
  })
}

