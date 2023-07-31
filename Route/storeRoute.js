var express = require('express');
const router = express.Router();
var storeController = require('../Controller/storeController');

router.get('/stores', storeController.getSoreList);
router.post('/store/save', storeController.saveStore);
router.put('/store/update', storeController.updateStore);
router.delete('/store/delete/:storeId', storeController.deleteStore);

module.exports = router;