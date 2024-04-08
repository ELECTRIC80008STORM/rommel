const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canViewCatsPages = require('../util/canViewCatsPages')

const catRouteController = require('../controllers/cats.controller');

router.get('/catpage', isAuth, catRouteController.getCatPage);

router.get('/', isAuth, canViewCatsPages, catRouteController.get_root);

module.exports = router;