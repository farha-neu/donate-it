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
    type: String,
    default:"images/playHouse.jpg"
  },
  category: {
    type:Schema.Types.ObjectId,
    ref:"Category"
  },
  user: {
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

var Item= mongoose.model("Item", ItemSchema);

module.exports = Item