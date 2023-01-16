const router = require('express').Router();
const { boardColumns, columnPut } = require('../controllers/columnsRoute');

router.get('/:id', boardColumns);
router.put('/', columnPut);

module.exports = router;
