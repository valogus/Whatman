/* eslint-disable no-unused-vars */
const router = require('express').Router();
const {
  tasksColumns, taskPut, taskDescription, taskComments, addCommentToTask, addTaskToColumn,
} = require('../controllers/taskRoute');

// router.get('/:id', tasksColumns);
router.get('/task/:id/comments', taskComments);
router.post('/task/:id/comments', addCommentToTask);
router.post('/', addTaskToColumn);
router.put('/:id', taskPut);
router.put('/task/:id', taskDescription);

module.exports = router;
