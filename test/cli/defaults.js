
var assert = require('assert')
  , path = require('path')
  , directories = require('../../lib/directories')
  , bin = path.join(directories.bin, 'js.la')
  , exec = require('child_process').exec
  , fs = require('fs')

describe('cli', function(){
  describe('empty command', function(){
    var args

    before(function(done){
      exec(bin, function(err, stdout, stderr){
        args =  { err: err
                , stdout: stdout
                , stderr: stderr
                }

        done()
      })
    })

    it('shows the cli help', function(){
      assert(args.stdout, 'no help spilled to `stdout`')
    })

    it('exits 1', function(){
      assert.equal(args.err.code, 1, 'should `process.exit(1)`')
    })
  })

  describe('bogus command', function(){
    var args

    before(function(done){
      exec(bin + ' bogus', function(err, stdout, stderr){
        args =  { err: err
                , stdout: stdout
                , stderr: stderr
                }

        done()
      })
    })

    it('shows the cli help', function(){
      assert(args.stdout, 'no help spilled to `stdout`')
    })

    it('exits 1', function(){
      assert.equal(args.err.code, 1, 'should `process.exit(1)`')
    })
  })
})
