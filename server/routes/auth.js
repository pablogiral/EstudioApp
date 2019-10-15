const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const StudioModel = require("../models/StudioModel");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      // console.log('req.login ')
      // console.log(user)

      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

// SIGNUP
router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  // console.log('username: ', username)
  // console.log('password: ', password)
  // console.log('email: ', email)
  // Check for non empty user, password or email
  if (!username || !password || !email) {
    next(new Error("You must provide valid credentials"));
  }

  // Check if user exists in DB
  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        email
      }).save();
    })
    .then(savedUser => login(req, savedUser)) // Login the user using passport
    .then(user => res.json({ status: "signup & login successfully", user })) // Answer JSON
    .catch(e => next(e));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    // Check for errors
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.post("/updateUser", (req, res, next) => {
  console.log(req.body.username, req.body.email)
  User.findOneAndUpdate(
    req.session.passport.user,
    { username: req.body.username, email: req.body.email },
    { new: true }
  )
    .then(updatedUser => res.json(updatedUser))
    .catch(e => next(e));
});

router.post("/deleteUser", (req, res, next) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => res.status(200).json({}))
    .catch(e => next(e));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


module.exports = router;
