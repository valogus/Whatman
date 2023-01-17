const router = require('express').Router();

const { allTasksUser } = require('../controllers/myTasks');

router.get('/:id', allTasksUser);

module.exports = router;
