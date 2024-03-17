const express = require('express');
const router = express.Router();

const catRouteController = require('../controllers/cats.controller');

router.get('/catpage', catRouteController.getCatPage);

router.get('/', catRouteController.get_root);

module.exports = router;