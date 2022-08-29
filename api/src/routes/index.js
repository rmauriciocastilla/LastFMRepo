const {Router} = require('express');
const adminRouter = require('./admin');
const artistsRouter = require('./artists');
const buyRouter = require('./buy');
const userRouter = require('./user');
const authRouter = require('./auth');

const router = Router();

router.use('/user',userRouter);
router.use('/admin',adminRouter);
router.use('/buy',buyRouter);
router.use('/artists',artistsRouter);
router.use('/auth',authRouter);

module.exports = router;