/* eslint-disable no-unused-vars */
const router = require('express').Router();
const {
  taskPut, taskDescription, taskComments, addCommentToTask, addTaskToColumn,
  deleteTask, taskAuthor, addExecutorToTask, taskExecutor,
} = require('../controllers/taskRoute');

router.get('/task/:id/comments', taskComments);
router.get('/task/author/:id', taskAuthor);
router.get('/:id/executors', taskExecutor);
router.post('/task/:id/comments', addCommentToTask);
router.post('/', addTaskToColumn);
router.post('/task/executor', addExecutorToTask);
router.put('/:id', taskPut);
router.put('/task/:id', taskDescription);
router.delete('/:id', deleteTask);

module.exports = router;
