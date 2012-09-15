
var assert = require('assert')
  , server = require('../../lib/server')
  , request = require('request')

describe('GET /', function(){
  var options = { method: 'GET' }

  before(function(done){
    server.listen(1337, function(){
      options.url = server.url + '/'

      done()
    })
  })

  it('responds with `text/html`', function(done){
    request(options, function(err, response){
      if (err) done(err)

      var code = response.statusCode
        , headers = response.headers
        , body = response.body

      // http://tomayko.com/writings/things-caches-do
      // https://github.com/isaacs/st/blob/master/test/basic.js
      assert.equal(code, 200, code + ' is NOT 200 ok')
      assert.equal(headers['content-type'], 'text/html', 'bad content-type')
      assert.ok(body, 'missing response body')
      assert.ok(body.match('JSLA INDEX'), 'invalid content')
      assert.ok(body.match('something'), 'no partials incuded')

      // Cache-Control
      // Content-Length
      // Content-MD5
      // ETag
      // Expires
      // Last-Modified
      // Server
      // if-none-match

      done()
    })
  })
})
