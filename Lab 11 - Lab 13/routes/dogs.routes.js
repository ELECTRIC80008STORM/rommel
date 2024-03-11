const express = require('express');
const router = express.Router();

const dogRouteController = require('../controllers/dogs.controller');

router.get('/dogpage', dogRouteController.getDogPage);

router.get('/', dogRouteController.get_root);

module.exports = router;