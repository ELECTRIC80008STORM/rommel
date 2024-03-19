const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const catRouteController = require('../controllers/cats.controller');

router.get('/catpage', isAuth, catRouteController.getCatPage);

router.get('/', isAuth, catRouteController.get_root);

module.exports = router;