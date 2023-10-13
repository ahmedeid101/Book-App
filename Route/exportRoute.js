var express = require('express');
const router = express.Router();
var exportController = require('../Controller/exportController');

router.get('/export/books', exportController.exportBooks);
//router.post('/user/save', exportController.saveUser);

module.exports = router;