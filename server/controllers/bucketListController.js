const { query, response } = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../db/db");

const bucketListController = {};

bucketListController.getList = (req, res, next) => {
  console.log("HERE ARE THE PARAMS: ", req.params.userID);
  try {
    // Add variable for userID and pass into values
    const query = `SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id
                    FROM places
                    INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
                    INNER JOIN users ON users.id=uip.fk_user_id
                    WHERE uip.fk_user_id=$1`;
    const values = [req.params.userID];

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

bucketListController.addItemToPlaces = (req, res, next) => {
  try {
    // NEED TO ADD QUERY STRING
    // potentailly change events table to link directly to users table via foreign key
    // const query = `INSERT INTO "users" ("username", "password", "firstname", "lastname") VALUES ('${username}', '${hash}', 'test', 'dummy')`; // chang ethe values
    // 1. grab the user id for current user
    // 2. grab the place id for the input locations
    // 3. add to user in places with user id and city id, each as a fk
    const query = `INSERT INTO places(city, state, country, zipcode) VALUES($1, $2, $3 $4)`;
    const values = [req.body.city, req.body.state, req.body.country, req.body.zipcode];
    db.query(query, values)
      .then(() => { console.log('Location added') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.addItemToPlaces: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
}

bucketListController.placesIntoUIP = (req, res, next) => {
  try {
    const query = `INSERT INTO users_in_places(fk_user_id, fk_city_id) VALUES ($1, $2)`;
    const values = [req.body.fk_user_id, req.body.fk_city_id];
    db.query(query, values)
      .then(() => { console.log('Users in places updated') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.placesIntoUIP: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
}


bucketListController.deleteItemFromUIP = (req, res, next) => {
  // NEED TO ADD QUERY STRING
  const query = `DELETE FROM users_in_places WHERE fk_city_id=$1`;
  const values = [req.body.fk_city_id];
  try {
    db.query(query, values)
      .then(() => { console.log('Item deleted') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteItemFromUIP: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};



bucketListController.deleteItemFromPlaces = (req, res, next) => {
  // NEED TO ADD QUERY STRING
  const query = `DELETE FROM places WHERE places.id=$1`;
  const values = [req.body.places.id];
  try {
    db.query(query, values)
      .then(() => { console.log('Location removed') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteItemFromPlaces: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

bucketListController.deleteWholeUIP = (req, res, next) => {
  const query = `DELETE FROM users_in_places WHERE fk_user_id=$1`;
  const values = [req.body.fk_user_id];
  try {
    db.query(query, values)
      .then(() => { console.log('List deleted') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteWholeUIP: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

bucketListController.deleteWholeList = (req, res, next) => {
  const query = `DELETE FROM places WHERE fk_user_id=$1`;
  const values = [req.body.fk_user_id];
  try {
    db.query(query, values)
      .then(() => { console.log('List deleted') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteWholeList: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

// bucketListController.addEventToList = (req, res, next) => {

// }


// SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id
// FROM places
// INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
// INNER JOIN users ON users.id=uip.fk_user_id
// WHERE uip.fk_user_id=1;

module.exports = bucketListController;
