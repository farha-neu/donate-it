var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type:String,
    required:true
  },
  condition: {
      type:String,
      required:true
  },
  note: {
      type:String,
      required:true
  },
  zipcode:{
    type: String,
    required: true
  },
 // category into item item into User
  category: {
    type:Schema.Types.ObjectId,
    ref:"Category"
  },
  user: {
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  dateCreated:{
    type:Date,
    default:Date.now
  } 
});

var Item= mongoose.model("Item", ItemSchema);

module.exports = Item