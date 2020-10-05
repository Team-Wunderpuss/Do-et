const { query, response } = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../db/db");

const bucketListController = {};

bucketListController.getList = (req, res, next) => {
  try {
    // Add variable for userID and pass into values
    const query = `SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id
                    FROM places 
                    INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
                    INNER JOIN users ON users.id=uip.fk_user_id
                    WHERE uip.fk_user_id=$1`;
    const values = [req.body.username];

    db.query(query, values)
      .then((response) => {
        res.locals.lists = response.rows;
        return next();
      })
  } catch (err) {
    return next({
      log: `bucketListController.getList: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

bucketListController.addItemToList = (req, res, next) => {
  try {
    // NEED TO ADD QUERY STRING
    // potentailly change events table to link directly to users table via foreign key
    // const query = `INSERT INTO "users" ("username", "password", "firstname", "lastname") VALUES ('${username}', '${hash}', 'test', 'dummy')`; // chang ethe values
    // 1. grab the user id for current user
    // 2. grab the place id for the input locations
    // 3. add to user in places with user id and city id, each as a fk
    // SELECT userID
    // INNNER JOIN with uip
    // INNER JOIN with places
    // INNER JOIN with events in places
    // INSERT INTO events table 
    db.query(query)
      .then(() => { console.log('Item added to list') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.addItemToList: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
}

bucketListController.deleteItem = (req, res, next) => {
  // NEED TO ADD QUERY STRING

  try {
    db.query(query)
      .then(() => { console.log('Item deleted') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteItem: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

bucketListController.deleteWholeList = (req, res, next) => {
  try {
    db.query(query)
      .then(() => { console.log('List deleted') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteWholeList: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

// SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id
// FROM places 
// INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
// INNER JOIN users ON users.id=uip.fk_user_id
// WHERE uip.fk_user_id=1;
