const router = require('express').Router();
const {
  boardColumns, columnPut, columnDelete, columnPost,
} = require('../controllers/columnsRoute');

router.get('/:id', boardColumns);
router.put('/', columnPut);
router.post('/', columnPost);
router.delete('/:id', columnDelete);

module.exports = router;
