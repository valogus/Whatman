const router = require('express').Router();

const { registerUser } = require('../controllers/registration');

router.post('/', registerUser);

module.exports = router;
