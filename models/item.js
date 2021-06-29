const mongoose = require("mongoose");
const category = require("./category");

var Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, minLength: 1, required: true },
  category: { type: Schema.Types.ObjectId, ref: category, required: true },
  price: { type: Number, required: true, min: 1 },
  brand: { type: String, required: true, minLength: 1 },
});

ItemSchema.virtual("url").get(function () {
  return `/${this.category}/${this._id}`;
});

module.exports = mongoose.model("ItemSchema", ItemSchema);
