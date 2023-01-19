const router = require('express').Router();
const {
  boardColumns, columnPut, columnDelete, columnPost, isCan,
} = require('../controllers/columnsRoute');

router.get('/:id', boardColumns);
router.get('/isCan/:userId/:id', isCan);
router.put('/', columnPut);
router.post('/', columnPost);
router.delete('/:id', columnDelete);

module.exports = router;
