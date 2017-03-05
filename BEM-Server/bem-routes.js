const express = require('express');
 
const app = module.exports = express.Router();
 
const User = require('./bem-user');
 
// POST
// Create a new User
app.post('/user', function (req, res) {
    console.log('POST Start: ' + req);
  if (!req.body.username && !req.body.full_name && !req.body.email && !req.body.password) {
    return res.status(400).send({ "success": false, "msg": "Blank fields on user." });
  }
 
  let newUser = new User({
    username: req.body.username,
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password
  });
 
  newUser.save(function (err) {
    if (err) {
      console.log("Unexpected Error: ", err);
      return res.json({ "success": false, "msg": "Error while creating User", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new User.' });
  });
});
 
// GET
// Get all open users
app.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating User", "error": err });
    }
 
    res.status(200).send({ "success": true, "result": users });
  });
});
 
// DELETE
// Remove one user by its ID
app.delete('/user/:userId', function (req, res) {
  let lectionId = req.params.userId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the User", "error": err });
  }
 
  User.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting User", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "User deleted" });
  });
});


// FIND USER
// find one user by its name
app.get('/find/:username', function (req, res) {
    console.log('Getting Username: ' + req.params.username);
  let lectionId = req.params.username;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the User", "error": err });
  }
 
  User.findOne({'username': lectionId}, function (err, results) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting User", "error": err });
    }
    if(results == null){
        results={};
    }
    return res.status(200).json(results);
  });

});

// LOGIN
// login with one user 
app.post('/login', function (req, res) {
    console.log('User: '+req.body.username);
  let password = req.body.password;
  let username = req.body.username;
  User.findOne({$and:[{'username': username},{'password':password}]}, function (err, results) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while login", "error": err });
    }
    if(results == null){
        results={};
        return res.json({ "success": false, "msg": "Error while login. Invalid Credentials"});
    }
    res.status(201).json(results);
  });

});
