const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  validateResult,
];

const validateRegister = [
  check("name").exists().notEmpty(),
  check("age").exists().notEmpty().isInt({ min: 16, max: 99 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  validateResult,
];

module.exports = { validateLogin, validateRegister };
