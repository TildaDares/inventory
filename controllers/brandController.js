const Brand = require("../models/brand");
const Item = require("../models/item");

exports.brand_list = function (req, res, next) {
  Brand.find({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }

    res.render("brand_list", { title: "Brands", brands: results });
  });
};

exports.brand_items = function (req, res, next) {
  Item.find({ brand: req.params.id })
    .populate("brand")
    .populate("category")
    .exec(function (err, results) {
      if (err) return next(err);

      res.render("brand_items", { title: req.params.name, items: results });
    });
};
