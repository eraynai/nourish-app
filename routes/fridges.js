var express = require('express');
var router = express.Router();
const fridgeCtrl = require('../controllers/fridges');

router.post('/new', upload.single('image'), fridgeCtrl.create);

module.exports = router;
