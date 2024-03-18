const express = require('express');
const router = express.Router();

const usersRouteController = require('../controllers/users.controller');

router.get('/signup', usersRouteController.get_signup);

router.post('/signup', usersRouteController.post_signup);

// Chnage later when user is authenticated
router.get('/profile', usersRouteController.get_profile);

router.get('/edit-profile', usersRouteController.get_edit_profile);

router.post('/edit-profile', usersRouteController.post_edit_profile);

router.get('/admin', usersRouteController.get_admin);

// router.get('/', mainRouteController.get_root);

module.exports = router;