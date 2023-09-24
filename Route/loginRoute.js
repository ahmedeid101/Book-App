var express = require('express');
const router = express.Router();
var loginController = require('../Controller/loginController');
var jwt = require('../Util/jwt');


router.get('/login/profile/:userId', jwt.verifyToken(["user"]), loginController.getUserProfile);
router.post('/login/signIn', loginController.signIn);

module.exports = router;