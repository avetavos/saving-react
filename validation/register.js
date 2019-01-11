const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "กรุณาระบุชื่อของคุณ";
  }

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

  if (validator.isAlpha(data.password, ["en-US"])) {
    errors.password = "อนุญาติให้ใช้ตัวอักษร A-Z,a-z,0-9 เท่านั้น";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.password = "รหัสผ่านไม่ตรงกัน";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
