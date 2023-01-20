const router = require('express').Router();

const { loginUser } = require('../controllers/login');

router.post('/', loginUser);

module.exports = router;
