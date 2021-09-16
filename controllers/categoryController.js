const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

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

exports.category_create_get = function (req, res, next) {
  res.render("category_brand_form", { title: "New Category" });
};

exports.category_create_post = [
  body("name", "Name should not be empty").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_brand_form", {
        title: "New Category",
        errors: errors.array(),
      });
      return;
    } else {
      category.save(function (err) {
        if (err) return next(err);

        res.redirect("/categories");
      });
    }
  },
];
