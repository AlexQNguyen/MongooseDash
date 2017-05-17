var mongoose = require('mongoose');

var OtterSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is too Short"], minlength: 2},
  favorite_color: { type: String, required: [true, "Color cannot be blank"], minlength: 2},
  age: { type: Number, required: [true, "Age Cannot be blank"]}
}, {timestamps: true})


var Otter =  mongoose.model('Otter',OtterSchema);
