const Category = require("../models/category");

exports.category_list = function(req, res, next) {
  Category.find({}).exec(function(err, results) {
    if(err) { return next(err) }

    res.render('category_list', {title: 'Categories', categories: results})
  })
}