const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const dashboardController=require('../controllers/dashboardController')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('admin/welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, dashboardController.homepage);

module.exports = router;