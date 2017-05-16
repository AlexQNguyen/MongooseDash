var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

//////DataBase Stuff///

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/otters_db');

var OtterSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is too Short"], minlength: 2},
  favorite_color: { type: String, required: [true, "Color cannot be blank"], minlength: 2},
  age: { type: Number, required: [true, "Age Cannot be blank"]}
}, {timestamps: true})

mongoose.model("Otter", OtterSchema);

var Otter =  mongoose.model('Otter');

////// Routes ///??
app.get('/', function(req, res) {
  Otter.find({}, function(err,otters){
    res.render("index", {otter:otters});
  })
})

app.get('/otters/new', function(req, res){
  res.render('new');
})

app.post('/otters', function(req, res){
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
})


app.get('/otters/:id', function(req, res){
 Otter.findOne({_id:req.params.id}, function(err, response){
   if(err){console.log("error")}
   else{

   res.render("show", {otter: response});

  }
 })
})


app.get('/otters/edit/:id', function(req, res){
  Otter.findOne({_id: req.params.id}, function(err, response){
  if(err){console.log("error")}
  else{
    res.render('edit', {otter:response});
  }
  })
})
//
app.post('/otters/:id', function(req, res){
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
})

app.post('/otters/destroy/:id', function(req, res){
  Otter.remove({_id: req.params.id}, function(err, results){
    if(err){
      console.log('errors');
    }
    else{
      res.redirect('/')
    }
  })
})
