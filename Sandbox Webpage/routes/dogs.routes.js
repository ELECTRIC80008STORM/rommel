const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const dogRouteController = require('../controllers/dogs.controller');

router.get('/dogpage', isAuth, dogRouteController.getDogPage);

router.get('/', isAuth, dogRouteController.get_root);

module.exports = router;