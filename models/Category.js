var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  
  
});


var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;