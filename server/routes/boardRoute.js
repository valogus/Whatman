/* eslint-disable no-unused-vars */
const router = require('express').Router();

const { boardsUser, addBoard } = require('../controllers/boardRoute');
const { Project } = require('../db/models');

router.get('/:id', boardsUser);

router.post('/', addBoard);

module.exports = router;
