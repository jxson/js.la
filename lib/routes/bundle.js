
module.exports = function(req, res){
  if (req.method !== 'GET') res.error(405)

  switch(req.url){
    case '/bundle.js': return js(req, res)
    default: res.error(404)
  }
}

function js(req, res){
  var path = require('path')
    , browserify = require('browserify')

  browserify()
  .add(path.resolve(__dirname, '../browser/index'))
  .bundle(function(err, src){
    if (err) return res.error(err)

    res.send(src, 200, { 'content-type': 'text/javascript' })
  })
}
