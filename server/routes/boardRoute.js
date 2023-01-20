/* eslint-disable no-unused-vars */
const router = require('express').Router();

const { boardsUser, addBoard, delBoard } = require('../controllers/boardRoute');

router.get('/:id', boardsUser);

router.post('/', addBoard);
router.delete('/', delBoard);

module.exports = router;
