const express = require('express');
const router = express.Router();
const profileCtrl = require('../../contollers/fridges');

router.get('/', profileCtrl.fridgesForUsers);
router.delete('/:id', profileCtrl.deleteOne);

module.exports = router;
