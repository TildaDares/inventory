const Item = require("../models/item");

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
