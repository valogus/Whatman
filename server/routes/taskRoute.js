/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { tasksColumns, taskPut } = require('../controllers/taskRoute');

// router.get('/:id', tasksColumns);
router.put('/:id', taskPut);

module.exports = router;
