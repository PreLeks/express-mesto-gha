const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { loginUserValidation, createUserValidation } = require('../middlewares/validation');
const notFoundController = require('../controllers/notFoundController');
const { signOut } = require('../controllers/signOut');

router.post('/signin', loginUserValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use(auth);

router.get('/signout', signOut);
router.use('/', userRouter);
router.use('/', cardRouter);

router.use('*', notFoundController);

module.exports = router;
