const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const usersRouteController = require('../controllers/users.controller');

router.get('/signup', usersRouteController.get_signup);

router.post('/signup', usersRouteController.post_signup);

router.get('/signin', usersRouteController.get_signin);

router.post('/signin', usersRouteController.post_signin);

// Chnage later when user is authenticated
router.get('/profile', isAuth, usersRouteController.get_profile);

router.get('/edit-profile', isAuth, usersRouteController.get_edit_profile);

router.post('/edit-profile', isAuth, usersRouteController.post_edit_profile);

router.get('/admin', isAuth, usersRouteController.get_admin);

// router.get('/', mainRouteController.get_root);

module.exports = router;