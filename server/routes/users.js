const express = require("express");
const router = express.Router();
let User = require("../models/user.model");


//Find user
router.route("/").get((req, res) => {
  User.find({email: req.query.email})
  .then((userData) => res.send(userData))
  .catch(err => res.status(400).json("Error: " + err));
})

//Validate password
router.route("/validatepassword").get((req, res) => {
  User.find({email: req.query.email})
  .then((userData) => {
    if (userData[0].password === req.query.password) {
      res.send(true)
    } else {
      res.send(false);
    }
  })
  .catch(err => res.status(400).json("Error: " + err));
})


// Sign up/Register
router.route("/register").post((req, res) => {

  console.log("firstname: ", req.body.firstname);
  console.log("email: ", req.body.email);

  // Get form values from post request
  var exists = false;
  const email = req.body.email;

  User.find({ email: email }, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    if (data.length != 0) {
      res.json({ error: true, message: "This email already exists!" });
    } else {
      // Create new user object
      console.log("body: ", req.body);
      let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        fingerprint: req.body.fingerprint,
        facialscan: req.body.facialscan,
        minpasswordtime: req.body.minpasswordtime,
        maxpasswordtime: req.body.maxpasswordtime
      });

      newUser
        .save()
        .then(() => res.json({ message: "Successfully registered!" }))
        .catch(err => res.status(400).json("Error: " + err));
    }
  }).catch(err => res.status(400).json("Error: " + err));

});


module.exports = router;








