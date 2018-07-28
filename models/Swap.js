var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var SwapSchema = new Schema({
  itemOne: {
    type:Schema.Types.ObjectId,
    ref:"Item"
  },
  itemTwo:{
    type:Schema.Types.ObjectId,
    ref:"Item"
  },
  status:{
    type: String
  }
});

var Swap= mongoose.model("Swap", SwapSchema);

module.exports = Swap