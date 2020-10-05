const bcrypt = require('bcrypt');
const db = require('../db/db')
// REQUIRE DB HERE

const userController = {};

userController.createUser = (req, res, next) => {
  // destructure user credentials and check if eith is undefined
  console.log('in create user');
  if (res.locals.oAuth) {
    if (res.locals.existingUser) {
      return next();
    }
    const { username, firstname, lastname } = res.locals;
    const password = 'password123';
    const query = `INSERT INTO "users" ("username", "password", "firstname", "lastname") VALUES ('${username}', '${password}', '${firstname}', '${lastname}')`;
    // send to database UPDATE THE NAME OF THE DB
    db.query(query)
      .then(() => console.log('Google User successfully saved in DB'))
      .then(next())
      .catch((err) => next(err));
  } else {
    const { username, password, firstname, lastname } = req.body;
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
      const query = `INSERT INTO "users" ("username", "password", "firstname", "lastname") VALUES ('${username}', '${hash}', '${firstname}', '${lastname}')`;
      // send to database UPDATE THE NAME OF THE DB
      db.query(query)
        .then(() => console.log('User successfully saved in DB'))
        .then(next())
        .catch((err) => next(err));
    });
  }
};

userController.validateUser = (req, res, next) => {
  // get username and hash from DB
  if (res.locals.oAuth) {
    const { username } = res.locals;
    const query = `SELECT * FROM "users" WHERE "username" = '${username}'`; // <--- need to make sure the username and password the same
    db.query(query)
      .then((response) => {
        if (response.rows[0]) {
          res.locals.user = response.rows[0];
          res.locals.existingUser = true;
          console.log('in vlidate moving to next', response.rows[0]);
          return next();
        };
        // redirect to createUser
        console.log('about to redirect');
        res.locals.existingUser = false;
        return next();
        // Compare plain text user input with the hashed password
        // const { hash } = response.rows[0];
        // bcrypt.compare(password, hash, (err, result) => {
        //   if (result) next();
        //   console.log('found user:', result);
        //   return next(err);
        // });
      })
      .catch((err) => next(err));
  } else {
    // destructure username and password from body
    const { username, password } = req.body;
    if (!username || !password) next('Username or password not correct') // --> DO WE WANt TO REDIRECT back to sign up if this fails?
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
