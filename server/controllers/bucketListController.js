const { query, response } = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../db/db");

const bucketListController = {};
// SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id, events.event
//                     FROM places
//                     INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
//                     INNER JOIN users ON users.id=uip.fk_user_id
//                     INNER JOIN events ON users.id=events.fk_user_id
//                     WHERE uip.fk_user_id=$1
bucketListController.getList = (req, res, next) => {
  try {
    // Add variable for userID and pass into values
    const query = `SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id
                    FROM places
                    INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
                    INNER JOIN users ON users.id=uip.fk_user_id
                    WHERE uip.fk_user_id=$1`;
    const values = [req.params.fk_user_id];
    db.query(query, values)
      .then((response) => {
        // console.log(response);
        res.locals.lists = response.rows;
        console.log('here is your list: ', res.locals.lists);
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
    console.log("MY BOD: ", req.body);
    // NEED TO ADD QUERY STRING
    // potentially change events table to link directly to users table via foreign key
    // const query = `INSERT INTO "users" ("username", "password", "firstname", "lastname") VALUES ('${username}', '${hash}', 'test', 'dummy')`; // chang ethe values
    // 1. grab the user id for current user
    // 2. grab the place id for the input locations
    // 3. add to user in places with user id and city id, each as a fk
    const query = `INSERT INTO places(city, state, country) VALUES($1, $2, $3) RETURNING id`;

    const values = [req.body.city, req.body.state, req.body.country];
    db.query(query, values)
      .then((data) => {
        console.log('ADDED ITEM');
        console.log(data.rows[0].id);
        res.locals.places_id = data.rows[0].id;
        return next();
      })
  } catch (err) {
    return next({
      log: `bucketListController.addItemToPlaces: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
}

bucketListController.placesIntoUIP = (req, res, next) => {
  try {
    const query = `INSERT INTO users_in_places(fk_city_id, fk_user_id) VALUES ($1, $2)`;
    const values = [res.locals.places_id, req.params.fk_user_id];
    console.log('THE PLACE ID THAT WAS SAVED: ', res.locals.places_id);
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
  const query = `DELETE FROM users_in_places WHERE fk_city_id=$1 AND fk_user_id=$2`;
  const values = [req.params.fk_city_id, req.params.fk_user_id];
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
  const query = `DELETE FROM users_in_places WHERE fk_user_id=$1`;
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

bucketListController.addEventToList = (req, res, next) => {
  const query = `INSERT INTO events(event, fk_user_id, fk_city_id) VALUES('{$1}', $2, $3)`
  const values = [req.body.event, req.body.fk_user_id, req.body.fk_user_id];
  try {
    db.query(query, values)
      .then(() => { console.log('Event Added') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.addEventToList: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

bucketListController.deleteEventFromList = (req, res, next) => {
  const query = `DELETE FROM events WHERE events.id=$1`;
  const values = [req.body.events.id];
  try {
    db.query(query, values)
      .then(() => { console.log('Event Deleted') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteEventFromList: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};

bucketListController.deleteAllEvents = (req, res, next) => {
  const query =`DELETE FROM events WHERE fk_user_id=$1`;
  const values = [req.body.fk_user_id];
  try {
    db.query(query, values)
      .then(() => { console.log('All events have been discarded') })
      .then(next());
  } catch (err) {
    return next({
      log: `bucketListController.deleteAllEvents: ERROR ${err}`,
      message: { err: "you messed up here" },
    });
  }
};
// SELECT places.*, uip.fk_user_id AS user_id, uip.fk_city_id AS place_id
// FROM places
// INNER JOIN users_in_places uip ON places.id=uip.fk_city_id
// INNER JOIN users ON users.id=uip.fk_user_id
// WHERE uip.fk_user_id=1;

module.exports = bucketListController;
