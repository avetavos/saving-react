const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const user = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => [
      User.findOne({ email }).then(user => {
        if (user) {
          const errors = {
            email = "อีเมลนี้ยังไม่มีการลงทะเบียน"
          }
          return done(null, false, { errors });
        }

        bcrypt.compare(password, user.passport, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user)
          }
          const errors = {
            email = "รหัสผ่านไม่ถูกต้อง"
          }
          return done(null, false, { errors });
        });
      })
    ])
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

}