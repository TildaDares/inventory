const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandController');

router.get('/', brandsController.brand_list);

module.exports = router;