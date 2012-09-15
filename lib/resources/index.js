
function index(req, res){
  // what representation? html || json
  // If json return the api description
  // if html return the rendered templates for the homepage
  // and et things the index will need

  req.haiku.read('index', function(err, page){
    if (err) throw err

    // console.log('page:', page)

    var html = page.render()

    console.log(html)

    res.setHeader('content-type', 'text/html')
    res.writeHead(200)
    res.end(html)
  })
}

module.exports = index

/*

* Route loads models
* Route renders templates or resources

*/
