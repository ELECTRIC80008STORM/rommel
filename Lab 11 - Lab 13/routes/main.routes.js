const express = require('express');
const router = express.Router();

const mainRouteController = require('../controllers/main.controller');

router.get('/userRegistration', mainRouteController.get_userRegistration);

router.post('/userRegistration', mainRouteController.post_userRegistration);

router.get('/', mainRouteController.get_root);

module.exports = router;