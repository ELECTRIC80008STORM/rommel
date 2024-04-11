const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canViewAdminFunctions = require('../util/canViewAdminFunctions');

const mainRouteController = require('../controllers/main.controller');

router.get('/uploaded-image', isAuth, canViewAdminFunctions, mainRouteController.get_uploadImage);

router.post('/uploaded-image', isAuth, canViewAdminFunctions, mainRouteController.post_uploadImage);

router.get('/', mainRouteController.get_root);

module.exports = router;