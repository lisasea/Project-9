const express = require("express");
const router = express.Router();


module.exports = router;

/*
Update User and Course routes
Update the User and Course POST and PUT routes to validate that the request body contains the following required values. Return validation errors when necessary.
User
firstName
lastName
emailAddress
password
Course
title
description
Implement validations within your route handlers or your Sequelize models.
Sequelize model validation gives you a rich set of tools to validate user data. See Sequelize docs for more information.
Use the Express next() function in each route handler to pass any Sequelize validation errors to the global error handler.
Send validation error(s) with a400 status code to the user.

*/