const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, minLength: 1, required: true },
});

CategorySchema.virtual("url").get(function () {
  return "/" + this.name;
});

module.exports = mongoose.model("Category", CategorySchema);
