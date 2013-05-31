
var bunyan = require('bunyan')
  , defaults = { port: '8080'
    , host: 'localhost'
    , 'log-level': 'warn'
    , logger: bunyan.createLogger({ name: 'jsla'
      , level: 'warn'
      , serializers: { req: bunyan.stdSerializers.req
        , res: bunyan.stdSerializers.res
        , err: bunyan.stdSerializers.err
        , error: bunyan.stdSerializers.err
        }
      })
    }

module.exports = Object.create({ get: get
, set: set
}, { values: { value: defaults }, persona: { get: getpersona }})

function get(k){
  if (k === 'persona') return this.persona

  var value = this.values[k]
    , assert = require('assert')

  assert.ok(value, 'No config value for "' + k + '"')

  return value
}

function set(k, v){
  this.values[k] = v

  if (k === 'log-level') this.values.logger.level(v)
}

function getpersona(){
  if (this._persona) return this._persona

  var url = require('url')
    , _url = require('url').format({ protocol: 'http'
      , hostname: this.get('host')
      , port: this.get('port')
      })
    , persona = require('persona-id')(_url)

  persona.on('create', function(sid, id){
    console.log('create: sid', sid)
    console.log('create: id', id)
  })

  persona.on('destroy', function(sid){
    console.log('create: sid', sid)
  })

  return this._persona = persona
}
