const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const userController = require('./controllers/userController');

const app = express();
const port = 3000;

//Import Custom Routers
const apiRouter = require("./routes/api.js");

/** 
 * handle parsing request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// statically serve everything in the build folder on the route '/build'
// if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
	// serve index.html on the route '/'
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../src/public/index.html'));
	});
// }

// catch-all route handler for any requests to an unknown route
app.all('*', (req, res) => {
	res.sendStatus(404);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.log('global error handler');
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};

	const errorObj = Object.assign(defaultErr, err);

	res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

// API route

app.use("/api", apiRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
