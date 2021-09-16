const { body, validationResult } = require("express-validator");
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

exports.brand_create_get = function (req, res, next) {
  res.render("category_brand_form", { title: "New Brand" });
};

exports.brand_create_post = [
  body("name", "Name should not be empty").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_brand_form", {
        title: "New Brand",
        errors: errors.array(),
      });
      return;
    } else {
      brand.save(function (err) {
        if (err) return next(err);

        res.redirect("/brands");
      });
    }
  },
];
