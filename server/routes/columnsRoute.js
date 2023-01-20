const router = require('express').Router();
const {
  boardColumns, columnPut, columnDelete, columnPost, isCan, editColumnTitle,
} = require('../controllers/columnsRoute');

router.get('/:id', boardColumns);
router.get('/isCan/:userId/:id', isCan);
router.put('/', columnPut);
router.put('/:id', editColumnTitle);
router.post('/', columnPost);
router.delete('/:id', columnDelete);

module.exports = router;
