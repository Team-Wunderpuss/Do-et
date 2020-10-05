const { Pool } = require('pg');

const PG_URI = 'postgres://fwifrlja:RQpa4SV4Be6gxr31Duhnt3ZFLwDXcAW-@lallah.db.elephantsql.com:5432/fwifrlja';

//creating a new pool using the connection string above
const pool = new Pool({
	connectionString: PG_URI,
});

//check if text approach is a good
module.exports = {
	query: (text, params) => pool.query(text, params),
};

/*
// user table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL UNIQUE,r
	password VARCHAR NOT NULL,
	firstName VARCHAR,
	lastName VARCHAR
);

// places table
CREATE TABLE places (
	id SERIAL PRIMARY KEY,
	city VARCHAR NOT NULL,
	state VARCHAR,
	country VARCHAR,
	zipcode INT
);

//event table w user id and place id
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
event TEXT[],
  fk_user_id INT,
  fk_city_id INT,
  FOREIGN KEY (fk_user_id) REFERENCES users (id),
FOREIGN KEY (fk_city_id) REFERENCES places (id)
);

// join users and places
CREATE TABLE users_in_places (
  id SERIAL PRIMARY KEY,
  fk_user_id INT,
  fk_city_id INT,
  FOREIGN KEY (fk_user_id) REFERENCES users (id),
FOREIGN KEY (fk_city_id) REFERENCES places (id)
);
*/
