var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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