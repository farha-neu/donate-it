var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  zipcode:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phonenumber: {
    type: String,
    required: true
  },
  item:[{
    type:Schema.Types.ObjectId,
    ref:"Item"
}]
});

var User= mongoose.model("User", UserSchema);

module.exports = User