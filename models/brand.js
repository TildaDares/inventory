const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, minLength: 1, required: true },
});

module.exports = mongoose.model("BrandSchema", BrandSchema);
