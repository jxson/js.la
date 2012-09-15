
var path = require('path')
  , source = path.resolve(__dirname, '..')

module.exports = { bin: path.join(source, 'bin')
, doc: path.join(source, 'doc')
, content: path.join(source, 'content')
, lib: path.join(source, 'lib')
, public: path.join(source, 'public')
, stylesheets: path.join(source, 'stylesheets')
, templates: path.join(source, 'templates')
, test: path.join(source, 'test')
}
