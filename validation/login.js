const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "กรุณาระบุอีเมลคุณ";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "อีเมลของคุณไม่ถูกต้อง";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "กรุณาระบุรหัสผ่านของคุณ";
  }

  if (
    !validator.isLength(data.password, {
      min: 6,
      max: 20
    })
  ) {
    errors.password =
      "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษรและไม่เกิน 30 ตัวอักษร";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
