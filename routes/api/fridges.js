const { fr } = require('date-fns/locale');
var express = require('express');
var router = express.Router();
const fridgeCtrl = require('../../controllers/fridges');
// const upload = require('../../config/cloudinary.config');

router.post('/', fridgeCtrl.create);
router.get('/', fridgeCtrl.getAll);

module.exports = router;
