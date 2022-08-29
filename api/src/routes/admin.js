const {Router} = require('express');
const admin = require('../controllers/Admin')

const router = Router()

router.get('/',admin);

module.exports = router;
