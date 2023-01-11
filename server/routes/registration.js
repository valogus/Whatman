const router = require('express').Router();

const { registerUser } = require('../controllers/registration');

router.post('/registration', registerUser);

module.exports = router;
