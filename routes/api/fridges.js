var express = require('express');
var router = express.Router();
const fridgeCtrl = require('../../contollers/fridges');
// const upload = require('../../config/cloudinary.config');

router.post('/', fridgeCtrl.create);

module.exports = router;
