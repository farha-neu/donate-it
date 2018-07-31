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
  dateCreated:{
    type:Date,
    default:Date.now
  },
  img:{ 
    type: String
  },
  category: {
    type:Schema.Types.ObjectId,
    ref:"Category"
  },
  user: {
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  requestedBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  status: {
    type: String,
    default:"Nil"
    // status: Pending, Accepted, Declined
  }
});

var Item= mongoose.model("Item", ItemSchema);

module.exports = Item