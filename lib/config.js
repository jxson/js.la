
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
},  { values: { value: defaults }
    , persona: { get: getpersona }
    , couch: { get: getcouchdb }
    })

function get(k){
  if (k === 'persona')  return this.persona
  if (k === 'couch')    return this.couch

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
  var config = this

  if (config._persona) return config._persona

  var url = require('url')
    , _url = require('url').format({ protocol: 'http'
      , hostname: config.get('host')
      , port: config.get('port')
      })
    , persona = require('persona-id')(_url)

  persona.on('create', function(sid, id){
    console.log('create: sid', sid)
    console.log('create: id', id)

    // find the user by email (multiple emails are allowed...)

    // no user? create them

    var uuid = require('node-uuid').v1()
      , db = config.get('couch').use('_users')
      , _id = 'org.couchdb.user:' + id.email
      , doc = { _id: _id
        , email: id.email
        , name: id.email
        , roles: []
        , type: 'user'
        }

    // console.log('_id', _id)
    console.log('doc', doc)

    db.insert(doc, function(err, body, headers){
      console.log('arguments', arguments)
    })

    // create: id { status: 'okay',
    //   email: 'jason@artifact.sh',
    //   audience: 'http://localhost:8080',
    //   expires: 1370115562890,
    //   issuer: 'login.persona.org' }
  })

  persona.on('destroy', function(sid){
    console.log('create: sid', sid)
  })

  return this._persona = persona
}

function getcouchdb(){
  var nano = require('nano')

  if (! this.values['couch-client']) {
    var url = process.env.COUCH_URL || 'http://localhost:5984'

    this.set('couch-client', nano(url))
  }

  return this.get('couch-client')
}

