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

/*user table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	firstName VARCHAR,
	lastName VARCHAR
	);
*/
