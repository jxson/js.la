
var server = require('../../lib/server')
  , request = require('supertest')

describe('GET /', function(){
  before(function(){
    server.logger.level('fatal')
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
