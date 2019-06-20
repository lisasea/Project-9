"use strict";

const express = require("express"); // load modules
const app = express(); // create the Express app
const morgan = require("morgan");
const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({ //builds data base
  dialect: 'sqlite',
  storage: './fsjstd-restapi.db'
});

sequelize //tests data base connection
  .authenticate()
  .then(() => {
    console.log('Connection to database success!');
  })
  .catch(err => {
    console.error('Unable to connect to database. :/')
  });

app.use(express.json());   // setup request body JSON parsing

app.use(morgan("dev")); // setup morgan which gives us http request logging

app.get('/', (req, res) => { // setup a friendly greeting for the root route
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

app.use("/api/indexes", require("./routes/indexes")); //index route 
app.use("/api/users", require("./routes/users")); //users route
app.use("/api/courses", require("./routes/courses"));//courses route
app.use("/api/authenticate", require("./routes/authenticate"));//authenticate rote

app.use((req, res) => {  // send 404 if no other route matched
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => { // setup a global error handler
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});
/*
//below from asynchronous code in express video 2 (what's utf-8 in line 57?)
//CALL BACKS
function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
      const users = JSON.parse(data);
      resolve();
      }
    });
  });
}

  app.get('/', (req, res) => {  //also from asynchronous code in express video 2
    getUsers()
      .then((users) => {
        throw new Error("Nooooooo"); //if works delete this line
        res.render('index', {title: "Users", users: users.users});
      })
      .catch((err) => {
        res.render('error', {error: err});
      });
  });
}

//code from teachers notes - example of what using promises to perform two asynchronous operations
app.get('/:id', (req, res) => {
 getUser(req.params.id)
   .then((user)=>{
     return getFollowers(user);
   })
   .then((user, followers)=>{
     res.render('profile', {title: "Profile Page", users: user, followers: followers});
   })
   .catch((err) => {
     res.render('error', {error: err});
   });
});
*/


app.listen(5000, () => console.log('REST API listening on port 5000!')); // set our port