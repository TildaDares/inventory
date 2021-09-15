const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");
const async = require("async");

exports.index = function (req, res, next) {
  Item.find({})
    .populate("category")
    .populate("brand")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("index", { title: "All items", items: results });
    });
};

exports.item_create_get = function (req, res, next) {
  async.parallel(
    {
      brands: function (callback) {
        Brand.find(callback);
      },
      categories: function (callback) {
        Category.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);

      res.render("item_form", {
        title: "New Item",
        brands: results.brands,
        categories: results.categories,
      });
    }
  );
};
