const express = require('express');
const router = express.Router();
const profileCtrl = require('../../controllers/fridges');

router.get('/', profileCtrl.fridgesForUsers);
router.delete('/:id', profileCtrl.deleteOne);

module.exports = router;
