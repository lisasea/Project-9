const express = require("express");
const router = express.Router();
const morgan = require("morgan"); //do I need this here?
const User = require("../models").User;
const authenticateUser = require("./authenticate");
const Sequelize = require("sequelize"); //do I need this here?

function asyncHandler(cb) {
    return async (req, res, next) => {
        try{
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

router.get("/", authenticateUser, (req, res) => { // ?? (req, res, next) ?? returns the current authenticated user
    res.status(200);
    res.json({
        id: req.currentUser.id,
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        emailAddress: req.currentUser.emailAddress,
    });
});


// /*                
router.post("/", (req, res, next) => { //creates user
    User.findOne({ where: { emailAddress: req.body.emailAddress }}) //check to see if email already exists
        .then(user => {
            if (user) { //if email already exists - error message
            res.status(400);
            res.json({ error: "User with this email already exists"})
        } else {
            const newUser = { //if email does NOT exist create new user
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                password: req.body.password
            };
        newUser.password = bcrypt.hashSync(newUser.password); //hash password
        User.create(newUser) //create new user
            .then (() => {
                res.location("/"); //set Location header to "/"
                res.status(201).end();
            })
            .catch(err => {
                err.status = 400;
                next(err);
            });
        }      
    })
    .catch(err => {
        err.status = 400;
        next(err);
    });
});

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

Hashing the password
Update the POST /api/users route to hash the user's password before persisting the user to the database.
For security reasons, we don't want to store user passwords in the database as clear text.
Use the bcryptjs npm package to hash the user's password.
See https://github.com/dcodeIO/bcrypt.js for more information.

Set up permissions to require users to be signed in
Add a middleware function that attempts to get the user credentials from the Authorization header set on the request.
You can use the basic-auth npm package to parse the Authorization header into the user's credentials.
The user's credentials will contain two values: a name value—the user's email address—and a pass value—the user's password (in clear text).
Use the user's email address to attempt to retrieve the user from the database.
If a user was found for the provided email address, then check that user's stored hashed password against the clear text password given using bcryptjs.
If the password comparison succeeds, then set the user on the request so that each following middleware function has access to it.
If the password comparison fails, then return a 401 status code to the user.
Use this middleware in the following routes:
XX GET /api/users
POST /api/courses
PUT /api/courses/:id
DELETE /api/courses/:id
*/