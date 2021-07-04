#! /usr/bin/env node

console.log(
  "This script populates some test items, brands and categories to the database. Specified database as argument - e.g.: populatedb mongodb+srv://beautifulchaos:coolpassword@cluster0.a9azn.mongodb.net/inventory?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");
var Brand = require("./models/brand");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var brands = [];
var categories = [];

function itemCreate(name, category, price, brand, stock, filename, cb) {
  item_detail = { name: name, price: price, category: category, brand: brand, stock: stock };
  if (filename !== null) {item_detail.filename = filename}

  var item = new Item(item_detail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function brandCreate(name, cb) {
  var brand = new Brand({ name: name });

  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Brand: " + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createBrands(cb) {
  async.series(
    [
      function (callback) {
        brandCreate("ASOS", callback);
      },
      function (callback) {
        brandCreate("Fashion Nova", callback);
      },
      function (callback) {
        brandCreate("SHEIN", callback);
      },
      function (callback) {
        brandCreate("Pretty Little Thing", callback);
      },
      function (callback) {
        brandCreate("PayPorte", callback);
      },
      function (callback) {
        brandCreate("Victoria's Secret", callback);
      },
      function (callback) {
        brandCreate("Ivy Park", callback);
      },
      function (callback) {
        brandCreate("NordStrum", callback);
      },
      function (callback) {
        brandCreate("Good American", callback);
      },
      function (callback) {
        brandCreate("American Eagle", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("Dresses", callback);
      },
      function (callback) {
        categoryCreate("Skirts", callback);
      },
      function (callback) {
        categoryCreate("Tops", callback);
      },
      function (callback) {
        categoryCreate("Shirts", callback);
      },
      function (callback) {
        categoryCreate("Jackets", callback);
      },
      function (callback) {
        categoryCreate("Athleisure", callback);
      },
      function (callback) {
        categoryCreate("Bottoms", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Floral Knitwear Sweater",
          categories[2],
          100,
          brands[0],
          0,
          "sweater.jpeg",
          callback
        );
      },
      function (callback) {
        itemCreate("Mom Jeans", categories[6], 400, brands[8], 3, "mom-jeans.jpeg", callback);
      },
      function (callback) {
        itemCreate(
          "Butterfly Ankara Top",
          categories[2],
          150,
          brands[0],
          100,
          "butterfly.jpeg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Leather Biker Jacket",
          categories[4],
          200,
          brands[1],
          50,
          "biker.jpeg",
          callback
        );
      },
      function (callback) {
        itemCreate("Bandage Dress", categories[0], 1200, brands[2], 1000, "bandage-dress.jpg", callback);
      },
      function (callback) {
        itemCreate(
          "Ruched Pencil Drawstrings Skirt",
          categories[1],
          240,
          brands[4],
          90,
          "drawstring.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Why We Should All Be Feminists Shirt",
          categories[4],
          150,
          brands[3],
          200,
          "feminist.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Beige Athleisure Set",
          categories[5],
          200,
          brands[5],
          280,
          "athleisure.jpeg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createBrands, createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
