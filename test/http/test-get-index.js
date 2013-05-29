
var server = require('../../lib/server')
  , config = require('../../lib/config')
  , request = require('supertest')

describe('GET /', function(){
  before(function(){
    config.set('log-level', 'fatal')
  })

  it('should respond with html', function(done){
    request(server)
    .get('/')
    .expect('content-type', 'text/html')
    .end(done)
  })

  it('should respond 200 ok', function(done){
    request(server)
    .get('/')
    .expect(200, done)
  })
})
