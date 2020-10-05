const bcrypt = require('bcrypt');
const db = require('../db/db')
// REQUIRE DB HERE

const userController = {};

userController.createUser = (req, res, next) => {
  // destructure user credentials and check if with is undefined
  const { username, password } = req.body;
  console.log('req.body: ', req.body);
  if (!username || !password) next('Username or password is undefined in userController.createUser');
  //save user in locals for use in middleware chain
  res.locals.user = username;
  // Set salt rounds
  const saltRounds = 10;
  // encrypt password and send to DB
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // query string NEED TO PUT PARAMS IN THE QUERY STRING
    // CHECK ON NAME OF TABLE FROM STORMY
    const query = `INSERT INTO "users" ("username", "password", "firstname", "lastname") VALUES ('${username}', '${hash}', 'test', 'dummy')`;
    // send to database UPDATE THE NAME OF THE DB
    db.query(query)
      .then(() => console.log('User successfully saved in DB'))
      .then(next())
      .catch((err) => next(err));
  });
};

userController.validateUser = (req, res, next) => {
  // destructure username and password from body
  const { username, password, oAuth } = req.body;
  if (!username || !password) next('Username or password not correct') // --> DO WE WANt TO REDIRECT back to sign up if this fails?
  // get username and hash from DB
  if (oAuth) {
    const query = `SELECT "password" FROM "users" WHERE "username" = '${username}'`; // <--- need to make sure the username and password the same
    db.query(query)
      .then((response) => {
        if (oAuth && response.rows[0]) next();
        if (oAuth && !response.rows[0]) {
          // redirect to createUser
        }
        // Compare plain text user input with the hashed password
        const { hash } = response.rows[0];
        bcrypt.compare(password, hash, (err, result) => {
          if (result) next();
          console.log('found user:', result);
          return next(err);
        });
      })
      .catch((err) => next(err));
  } else {
    const query = `SELECT "password" FROM "users" WHERE "username" = '${username}'`; // <--- need to make sure the username and password the same
    db.query(query)
      .then((response) => {
        bcrypt.compare(password, response.rows[0].password, (err, result) => {
          if (result) return next();
          return next(err);
        });
      })
      .catch((err) => next(err));
  }
};

userController.getUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) next('Username or password not correct') // --> DO WE WANt TO REDIRECT back to sign up if this fails?

  let query = "SELECT * FROM users where users.username=$1"
  let values = [username];
  db.query(query, values)
  .then((response) => {
    res.locals.user = response.rows[0];
    console.log('res.locals.user: ', res.locals.user);
    return next();
  })
  .catch((err) => next(err));
}

module.exports = userController;
