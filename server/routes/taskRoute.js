const router = require('express').Router();
const { tasksColumns } = require('../controllers/taskRoute');

router.get('/:id', tasksColumns);

module.exports = router;
