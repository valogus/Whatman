/* eslint-disable no-unused-vars */
const router = require('express').Router();

const { getUsers } = require('../controllers/usersRoute');

router.get('/', getUsers);

module.exports = router;
