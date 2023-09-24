var express = require('express');
const router = express.Router();
var userController = require('../Controller/userController');

router.get('/users', userController.getUserList);
router.post('/user/save', userController.saveUser);
router.put('/user/update', userController.updatUser);
router.delete('/user/delete/:userId', userController.deleteUser);



module.exports = router;