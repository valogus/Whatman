const router = require('express').Router();
const { getAllUserByProject } = require('../controllers/projectsRoute');

router.get('/:id/executors', getAllUserByProject);

module.exports = router;
