const {Router} = require('express');
const user = require('../controllers/User')

const router = Router()

router.get('/',user);

module.exports = router;