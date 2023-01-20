/* eslint-disable no-unused-vars */
const router = require('express').Router();

const { putUserProject, getUsersProject, deleteUserProject } = require('../controllers/usersProjectRoute');

router.get('/:id', getUsersProject);
router.put('/:id', putUserProject);
router.delete('/:id', deleteUserProject);
module.exports = router;
