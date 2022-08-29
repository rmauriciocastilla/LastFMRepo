const {Router} = require('express');
const auth = require('../controllers/Autentication/AuthLogRes');
const isUser = require('../controllers/Autentication/isUser');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.post('/register',auth.registerUser);
router.post('/login',auth.loginUser);
router.get('/role',[verifyToken],isUser)
module.exports = router;