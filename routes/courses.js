const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize"); //do I need this?
const Course = require("../models".Course);
const User = require("..models".User);
const authenticateUser = require("./authenticate");

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};


router.get("/", asyncHandler( async (req, res) => { //SEND GET request to Return a list of courses (including the user that owns each course)
    const courses = await Course.findAll ({
        attributes: ["id", "title", "description", "userId"],
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName", "emailAddress",]
            }
        ]
    });
    res.json({ courses });
}));

router.get("/", asyncHandler( async (req, res) => { //SEND GET request to Return a list of courses (including the user that owns each course) for the provided course ID
    const courses = await Course.findAll ({
        attributes: ["id", "title", "description", "userId"],
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName", "emailAddress",]
            }
        ]
    });
    res.json({ courses });
}));



module.exports = router;

/*

// XX SEND GET request to READ a list of courses
// Send GET request to READ (view) a course
// Send POST request to CREATE a new course
// Send PUT request to UPDATE (edit) a course
// Send DELETE request to DELETE a course

Create the course routes
Set up the following routes (listed in the format HTTP METHOD Route HTTP Status Code):
XX GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
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