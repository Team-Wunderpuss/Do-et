const express = require('express');

const bucketListController = require('../controllers/bucketListController');

const router = express.router();


router.get('/', bucketListController.getList, (req, res, next) => {
    res.status(200).json({ lists: res.locals.lists });
});


router.post('/additem', bucketListController.addItemToList, bucketListController.getList, (req, res, next) => {
  res.status(200).json({ lists: res.locals.lists });
});

router.delete('/:id', bucketListController.deleteItem, bucketListController.getList, (req, res, next) => {
  res.status(200).json({ lists: res.locals.lists });
})

router.delete('/deleteall/:username', bucketListController.deleteWholeList, (req, res, next) => {
  res.status(200).json({ lists: res.locals.lists });
})