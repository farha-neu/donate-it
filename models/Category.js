var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
item: [{
    type:Schema.Types.ObjectId,
    ref:"Item"
}]
  
  
});


var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;