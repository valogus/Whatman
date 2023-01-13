/* eslint-disable no-unused-vars */
const router = require('express').Router();

const { boardsUser, addBoard } = require('../controllers/boardRoute');

router.get('/:id', boardsUser);

router.post('/', addBoard);

module.exports = router;
