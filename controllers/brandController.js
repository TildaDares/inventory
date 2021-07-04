const Brand = require("../models/brand")

exports.brand_list = function(req, res, next) {
  Brand.find({}).exec(function(err, results) {
    if(err) { return next(err) }

    res.render('brand_list', { title: 'Brands', brands: results} )
  })
}