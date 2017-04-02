const express = require('express');

const app = module.exports = express.Router();

const User = require('./bem-user');
const Booking = require('./bem-booking');
const Salon = require('./bem-salon');


// POST
// Create a new User
app.post('/user', function (req, res) {
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
  let lectionId = req.params.username;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the User", "error": err });
  }

  User.findOne({ 'username': lectionId }, function (err, results) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while searching User", "error": err });
    }
    if (results == null) {
      return res.status(400).json({ "success": false, "msg": "User not found." });
    }
    results.password = '';
    return res.status(200).json(results);
  });

});

// LOGIN
// login with one user 
app.post('/login', function (req, res) {
  let password = req.body.password;
  let username = req.body.username;
  User.findOne({ $and: [{ 'username': username }, { 'password': password }] }, function (err, results) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while login", "error": err });
    }
    if (results == null) {
      return res.json({ "success": false, "msg": "Error while login. Invalid Credentials" });
    }
    let usr = results;
    usr.password = '';
    res.status(201).json({ 'success': true, user: usr });
  });

});

// REQUEST BOOKING
// requesting booking with one user 
// TODO: Add some sort of verification to avoid multiple bookings on a certain timespan
app.post('/book', function (req, res) {
  let booking = new Booking({
    username: req.body.username,
    location: req.body.booking.location,
    service: req.body.booking.service,
    date: req.body.booking.date,
    time: req.body.booking.time,
    timeMargin: req.body.booking.margin,
    travelTime: req.body.booking.ttime,
    status: 'new'
  });

  booking.save(function (err) {
    if (err) {
      console.log("Unexpected Error: ", err);
      return res.json({ "success": false, "msg": "Error while creating booking", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new booking.' });
  }).then(function () {
    requestAvailableSalons(req.body.booking.location, req.body.booking.service, booking._id);
  });
});

//Update the bookings - Test
//When loading bookings for a user - exclude reviewed - autocomplete completed (based on date) - expire non selected after time expires
app.get('/bookings/:username', function (req, res) {
  Booking.find({ $and: [{ 'status': { $ne: 'reviewed' } }, { 'status': { $ne: 'expired' } }, { 'username': req.params.username }] }, function (err, bookings) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while retrieving bookings", "error": err });
    }
    if (bookings == null || bookings.length < 1) {
      return res.status(400).json({ "success": false, "msg": "Bookings not found." });
    }
    bookings.forEach(function (booking) {
      booking.date.setHours(booking.time);
      booking.date.setMinutes(booking.timeMargin);
      console.log(booking.date + ' <---- Modified!');
      if (booking.date < new Date()) {
        console.log(booking.date + ' <---- Completed!');
        booking.status = 'completed';
        if (booking.selected == null) {
          booking.status = 'expired';
        }
        booking.save();
      }
    }, this);
    res.status(200).send({ "success": true, "bookings": bookings });
  });
});

function requestAvailableSalons(location, service, id) {
  let result = [];
  Salon.find({ $and: [{ 'location': location }, { 'services': { $elemMatch: { $eq: service } } }] }, function (err, results) {
    if (err) {
      console.log({ "success": false, "msg": "Error while searching Salon", "error": err });
    }
    if (results == null || results.length < 1) {
      return { "success": false, "msg": "Salons not found." };
    }
    result = results;
  }).then(function (result) {
    let candidates = [];
    for (var i = 0; i < result.length; i++) {
      let candidate = {
        salonID: result[i]._id,
        name: result[i].name,
        price: Math.floor(Math.random() * (45 - 20 + 1) + 20)//20 
      };
      candidates.push(candidate);
    }
    Booking.update({ '_id': id }, { 'candidates': candidates, 'status': 'pending' }, function (err, data) {
      if (err) {
        console.log('Error while updating booking. ID:' + id);
      }
    });
  });
}

// FIND Salon
// find one salon by its id
app.get('/findSalon/:salonID', function (req, res) {
  let lectionId = req.params.salonID;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Salon", "error": err });
  }

  Salon.findOne({ '_id': lectionId }, function (err, results) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while searching Salon", "error": err });
    }
    if (results == null) {
      return res.status(400).json({ "success": false, "msg": "Salon not found." });
    }
    return res.status(200).json({ "success": true, "salon": results });
  });

});

//ACCEPTING OFFER FROM SALON
app.post('/acceptOffer', function (req, res) {
  let selected = {
    salonID: req.body.candidate.salonID,
    name: req.body.candidate.name,
    price: req.body.candidate.price
  };
  let id = '_' + req.body.bookingID.toString();
  Booking.findById(req.body.bookingID, function (err, doc) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while accepting offer", "error": err });
    }
    if (doc == null) {
      return res.json({ "success": false, "msg": "Error while accepting offer", "error": err });
    }
    let booking = doc;
    booking.selected = [];
    booking.selected.push(selected);
    booking.status = 'accepted';
    booking.save(function (err) {
      if (err) {
        console.log("Unexpected Error: ", err);
        return res.json({ "success": false, "msg": "Error while accepting offer", "error": err });
      }
      res.status(201).send({ "success": true, "msg": 'Successful accepting offer.' });
    })

  });
});

//POST A REVIEW FOR A SALON
app.put('/postReview', function (req, res) {
  let bookingID = req.body.bookingID;
  let salonID = req.body.salonID;
  let review = req.body.review;
  console.log(req.body.review);
  //review {rating, reviewText}
  //set booking to finished or reviewed
  Booking.findById(bookingID, function (err, doc) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while finding booking", "error": err });
    }
    if (doc == null) {
      return res.json({ "success": false, "msg": "Error while finding booking", "error": err });
    }
    let booking = doc;
    booking.status = 'reviewed';
    booking.save(function (err) {
      if (err) {
        console.log("Unexpected Error: ", err);
        return res.json({ "success": false, "msg": "Error while saving booking", "error": err });
      }
    })
  });
  Salon.findById(salonID, function (err, doc) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while finding salon", "error": err });
    }
    if (doc == null) {
      return res.json({ "success": false, "msg": "Error while finding salon", "error": err });
    }
    let salon = doc;
    salon.rating = Math.ceil(((salon.rating * salon.review.length) + review.rating) / (salon.review.length + 1));
    salon.review.push({ 'review': review });
    salon.save(function (err) {
      if (err) {
        console.log("Unexpected Error: ", err);
        return res.json({ "success": false, "msg": "Error while saving review", "error": err });
      }
    })
  });
  res.status(201).send({ "success": true, "msg": 'Successful saving review.' });
});


//Create Salon [FOR TESTING/ADMIN purposes]
app.post('/addSalon', function (req, res) {
  if (!req.body.name && !req.body.location && !req.body.services && !req.body.description) {
    return res.status(400).send({ "success": false, "msg": "Blank fields on salon." });
  }
  let newSalon = new Salon({
    name: req.body.name,
    location: req.body.location,
    services: req.body.services,
    description: req.body.description,
    imgsrc: req.body.imgsrc
  });

  newSalon.save(function (err) {
    if (err) {
      console.log("Unexpected Error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Salon", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Salon.' });
  });
});

