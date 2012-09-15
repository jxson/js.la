
var routes = require('routes')
  , Router = routes.Router
  , router = new Router()

router.addRoute('/', require('./resources/index'))
router.addRoute('/stylesheets/:sheet.css', require('./resources/stylesheets'))

// https://github.com/carlos8f/node-buffet?utm_source=javascriptweekly&utm_medium=email

module.exports = router

