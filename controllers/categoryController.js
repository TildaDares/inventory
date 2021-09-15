const Category = require("../models/category");
const Item = require("../models/item");

exports.category_list = function (req, res, next) {
  Category.find({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }

    res.render("category_list", { title: "Categories", categories: results });
  });
};

exports.category_items = function (req, res, next) {
  Item.find({ category: req.params.id })
    .populate("brand")
    .populate("category")
    .exec(function (err, results) {
      if (err) return next(err);

      res.render("category_items", { title: req.params.name, items: results });
    });
};
