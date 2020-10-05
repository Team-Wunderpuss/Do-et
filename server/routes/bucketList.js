const express = require('express');

const bucketListController = require('../controllers/bucketListController');

const router = express.Router();


router.get('/', bucketListController.getList, (req, res) => {
    res.status(200).json({ lists: res.locals.lists });
});


router.post('/addItem', bucketListController.addItemToList, bucketListController.getList, (req, res) => {
  res.status(200).json({ lists: res.locals.lists });
});

router.delete('/:id', bucketListController.deleteItem, bucketListController.getList, (req, res) => {
  res.status(200).json({ lists: res.locals.lists });
})

router.delete('/deleteAll/:username', bucketListController.deleteWholeList, (req, res) => {
  res.status(200).json({ lists: res.locals.lists });
})

module.exports = router;
