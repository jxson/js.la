
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

      assert.equal(code, 200, code + ' is NOT 200 ok')
      assert.equal(headers['content-type'], 'text/html', 'bad content-type')
      assert.ok(body, 'missing response body')
      assert.ok(body.match('JSLA'), 'invalid content')

      done()
    })
  })
})
