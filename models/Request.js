var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RequestSchema = new Schema({ 
  
  item: {
    type:Schema.Types.ObjectId,
    ref:"Item"
  },
  status: {
    type: String,
    required:true
  }

});

var Request= mongoose.model("Request", RequestSchema);

module.exports = Request;