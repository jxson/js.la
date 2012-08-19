
var assert = require('assert')
  , path = require('path')
  , directories = require('../../lib/directories')
  , bin = path.join(directories.bin, 'js.la')
  , exec = require('child_process').exec
  , fs = require('fs')
  , run

function run(command, callback){
  var command = command || ''
    , callback = callback || function(){}

  if (typeof(command) === 'function') {
    callback = command
    command = ''
  }

  exec(bin + ' ' + command, callback)
}

describe('cli', function(){
  describe('empty command', function(){
    it('`process.exit(1)` with help on `stdout`', function(done){
      run(function(err, stdout, stderr){
        assert(err, 'Missing error')
        assert.equal(err.code, 1, 'should `process.exit(1)`')
        assert(stdout, 'no help spilled to `stdout`')

        done()
      })
    })
  })

  describe('bogus command', function(){
    it('`process.exit(1)` with help on `stdout`', function(done){
      run('bogus', function(err, stdout, stderr){
        assert(err, 'Missing error')
        assert.equal(err.code, 1, 'should `process.exit(1)`')
        assert(stdout, 'no help spilled to `stdout`')

        done()
      })
    })
  })
})
