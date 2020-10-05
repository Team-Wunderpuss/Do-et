const express = require('express');

const bucketListController = require('../controllers/bucketListController');

const router = express.Router();


router.get('/:userID', bucketListController.getList, (req, res) => {
    res.status(200).json({ lists: res.locals.lists });
});


router.post('/additem', bucketListController.addItemToPlaces, bucketListController.placesIntoUIP, bucketListController.getList, (req, res) => {
  res.status(200).json({ lists: res.locals.lists });
});

router.delete('/:id', bucketListController.deleteItemFromUIP, bucketListController.deleteItemFromPlaces, bucketListController.getList, (req, res) => {
  res.status(200).json({ lists: res.locals.lists });
});

router.delete('/deleteall/:username', bucketListController.deleteWholeUIP, bucketListController.deleteWholeList, (req, res) => {
  res.status(200).json({ lists: res.locals.lists });
});

module.exports = router;
