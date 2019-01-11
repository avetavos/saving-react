const router = require("express").Router();
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const passport = require("passport");
const gravatar = require("gravatar");

const User = require("../models/User");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");

// Route::: POST /user/register
// Desc::: Register new user
// Access::: Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "อีเมลนี้มีบัญชีอยู่แล้ว";
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.status(201).json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// Route::: POST /user/login
// Desc::: Login user and return token
// Access::: Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  passport.authenticate("local", {});
});

module.exports = router;
