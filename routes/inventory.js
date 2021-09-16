const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");
const brandsController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");

router.get("/items", itemsController.index);
router.get("/items/create", itemsController.item_create_get);
router.post("/items/create", itemsController.item_create_post);
router.get("/items/:name/:id", itemsController.index);

router.get("/brands", brandsController.brand_list);
router.get("/brand/:name/:id", brandsController.brand_items);

router.get("/categories", categoryController.category_list);
router.get("/category/:name/:id", categoryController.category_items);

module.exports = router;
