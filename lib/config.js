
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
}, { values: { value: defaults } })

function get(k){
  var value = this.values[k]
    , assert = require('assert')

  assert.ok(value, 'No config value for "' + k + '"')

  return value
}

function set(k, v){
  this.values[k] = v

  if (k === 'log-level') this.values.logger.level(v)
}

