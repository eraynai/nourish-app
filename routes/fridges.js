var express = require('express');
var router = express.Router();
const fridgeCtrl = require('../controllers/fridges');
const upload = require('../config/cloudinary.config');

router.post('/new', upload.single('image'), fridgeCtrl.create);

module.exports = router;
