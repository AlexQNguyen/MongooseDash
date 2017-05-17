var mongoose = require('mongoose');
var Otter =  mongoose.model('Otter');

module.exports = {

  show_all: function(req, res) {
    Otter.find({}, function(err,otters){
      res.render("index", {otter:otters});
    })
  },

  add: function(req, res){
    var new_otter = new Otter();
    new_otter.name = req.body.name;
    new_otter.favorite_color = req.body.favorite_color;
    new_otter.age = req.body.age;
    new_otter.save(function(err){
      if(err){
        res.render('new', {title: 'you have errors!', errors: new_otter.errors});
      }
      else{
        res.redirect('/');
      }
    })
  },
  show: function(req, res){
   Otter.findOne({_id:req.params.id}, function(err, response){
     if(err){console.log("error")}
     else{

     res.render("show", {otter: response});

    }
   })
 },

 edit: function(req, res){
   Otter.findOne({_id: req.params.id}, function(err, response){
   if(err){console.log("error")}
   else{
     res.render('edit', {otter:response});
   }
   })
 },

 update: function(req, res){
   var otter = Otter.findOne({_id:req.params.id});
    Otter.update({_id: req.params.id},
   {  name: req.body.name,
      favorite_color: req.body.favorite_color,
      age: req.body.age
    },
    { runValidators: true },
      function(err, results){
        if(err){
          res.render('edit', {otter:otter, title: 'you have errors!', errors: err.errors});;
        }
        else{
          res.redirect('/');
        }
   })
 },

 destroy: function(req, res){
   Otter.remove({_id: req.params.id}, function(err, results){
     if(err){
       console.log('errors');
     }
     else{
       res.redirect('/')
     }
   })
 }






} // end of module exports
