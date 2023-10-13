var express = require('express');
const router = express.Router();
var uploadController = require('../Controller/uploadController');

//router.get('/upload/file', uploadController.uploadFile);
router.post('/upload/file', uploadController.uploadFile);

module.exports = router;