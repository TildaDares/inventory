const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");
const brandsController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");

router.get("/items", itemsController.index);
router.get("/brands", brandsController.brand_list);
router.get("/categories", categoryController.category_list);

module.exports = router;
