const express = require("express");
const router = express.Router();


module.exports = router;

/*

Create the course routes
Set up the following routes (listed in the format HTTP METHOD Route HTTP Status Code):
GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
PUT /api/courses/:id 204 - Updates a course and returns no content
DELETE /api/courses/:id 204 - Deletes a course and returns no content

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