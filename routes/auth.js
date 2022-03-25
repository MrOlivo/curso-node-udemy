const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl } = require("../controllers/AuthController");
const { validateRegister, validateLogin } = require("../validators/auth");

router.post("/login", validateLogin, loginCtrl);
router.post("/register", validateRegister, registerCtrl);

module.exports = router;
