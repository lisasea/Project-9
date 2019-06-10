'use strict';

// load modules
const express = require('express');
// create the Express app
const app = express();
const morgan = require('morgan');
//const routes = require('./routes'); //?? per REST API Authentication w/ express instruction

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup request body JSON parsing
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup REST api routes here 
//app.use('/api, routes); //?? per REST API Authentication w/ express instruction
app.use("/api", require("./routes/index")); //index route 
app.use("/api/users", require("./routes/users")); //users route
app.use("/api/courses", require("./routes/courses"));//courses route
app.use("/api/authenticate", require("./routes/authenticate"));//authenticate rote

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});