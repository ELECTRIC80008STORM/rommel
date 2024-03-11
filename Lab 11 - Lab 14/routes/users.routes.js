const express = require('express');
const router = express.Router();

const usersRouteController = require('../controllers/users.controller');

router.get('/signup', usersRouteController.get_signup);

router.post('/signup', usersRouteController.post_signup);

// router.get('/', mainRouteController.get_root);

module.exports = router;