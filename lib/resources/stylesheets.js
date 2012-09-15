
var directories = require('../directories')
  , path = require('path')
  , fs = require('fs')
  , stylus = require('stylus')
  , nib = require('nib')

function stylesheets(req, res){
  var sheet = path.join(directories.stylesheets, req.params.sheet + '.styl')

  console.log('stylesheet sheet:', sheet)

  fs.readFile(sheet, 'utf8', function(err, data){
    if (err) throw err

    stylus(data)
    .set('filename', sheet)
    .use(nib())
    .define('url', stylus.url({ paths: [ directories.public ] }))
    .render(function(err, css){
      if (err) throw err

      res.setHeader('content-type', 'text/css')
      res.writeHead(200)
      res.end(css)
    })
  })
}

module.exports = stylesheets
