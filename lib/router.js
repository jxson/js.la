
var routes = require('routes')
  , router = new routes.Router()

add('/', 'index')
add('/health', 'health')

module.exports = router

// Shorthand for adding routes corresponding to modules in `lib/routes`
function add(route, module){
  var _path = require('path')
      .join(__dirname, 'routes', module)

  router.addRoute(route, require(_path))
}
