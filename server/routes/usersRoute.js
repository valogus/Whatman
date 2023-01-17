/* eslint-disable no-unused-vars */
const router = require('express').Router();

const { getUsers, putUser } = require('../controllers/usersRoute');

router.get('/', getUsers);
router.put('/:id', putUser);
module.exports = router;
