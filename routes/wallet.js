const router = require("express").Router();
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const passport = require("passport");

router.get("/", (req, res) => res.json({ msg: "Wallet works!" }));

module.exports = router;
