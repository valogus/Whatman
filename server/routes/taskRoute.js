/* eslint-disable no-unused-vars */
const router = require('express').Router();
const {
  taskPut, taskDescription, taskComments, addCommentToTask, addTaskToColumn,
  deleteTask,
} = require('../controllers/taskRoute');

// router.get('/:id', tasksColumns);
router.get('/task/:id/comments', taskComments);
router.post('/task/:id/comments', addCommentToTask);
router.post('/', addTaskToColumn);
router.put('/:id', taskPut);
router.put('/task/:id', taskDescription);
router.delete('/:id', deleteTask);

module.exports = router;
