var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  condition: {
      type:String,
      required:true
  },
note: {
    type:String,
    required:true
},
  
  phonenumber: {
    type: String,
    required: true
  },
  category:{
      type: Schema.Types.ObjectId,
      ref:"Category"
  },
  
  
});

var Item= mongoose.model("Item", ItemSchema);

module.exports = Item