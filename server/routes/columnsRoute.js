const router = require('express').Router();
const { boardColumns } = require('../controllers/columnsRoute');

router.get('/:id', boardColumns);

module.exports = router;
