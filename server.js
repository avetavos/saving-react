const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 5000;
const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/user", require("./routes/user"));
app.use("/wallet", require("./routes/wallet"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
