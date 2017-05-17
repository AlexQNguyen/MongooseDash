var otters = require('../controllers/otters.js');

module.exports = function(app){

    app.get('/', function(req, res) {
      otters.show_all(req, res);
      })


    app.get('/otters/new', function(req, res){
      res.render('new');
    })

    app.post('/otters', function(req, res){
      otters.add(req, res);
    })

    app.get('/otters/:id', function(req, res){
      otters.show(req, res);
    })


    app.get('/otters/edit/:id', function(req, res){
      otters.edit(req, res);
    })
    //
    app.post('/otters/:id', function(req, res){
      otters.update(req,res);
    })

    app.post('/otters/destroy/:id', function(req, res){
      otters.destroy(req, res)
    })
}
