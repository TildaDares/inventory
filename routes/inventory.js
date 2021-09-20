const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");
const brandsController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");

router.get("/items/:name/:id/update", itemsController.item_update_get);
router.post("/items/:name/:id/delete", itemsController.item_delete_post);
router.get("/items/create", itemsController.item_create_get);
router.post("/items/create", itemsController.item_create_post);
router.get("/items/:name/:id", itemsController.show);
router.get("/items", itemsController.index);

router.get("/brands/create", brandsController.brand_create_get);
router.post("/brands/create", brandsController.brand_create_post);
router.get("/brand/:name/:id", brandsController.brand_items);
router.get("/brands", brandsController.brand_list);

router.get("/category/create", categoryController.category_create_get);
router.post("/category/create", categoryController.category_create_post);
router.get("/category/:name/:id", categoryController.category_items);
router.get("/categories", categoryController.category_list);

module.exports = router;
