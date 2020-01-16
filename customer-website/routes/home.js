const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/homeController');

//GET homepage
router.get('/',home_controller.home_index);

module.exports = router;