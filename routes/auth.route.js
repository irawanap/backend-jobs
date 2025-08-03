const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { validate } = require("../middlewares/validation.middleware");

// @route   POST /api/auth/register
router.post("/register", validate("register"), registerUser);

// @route   POST /api/auth/login
router.post("/login", validate("login"), loginUser);

module.exports = router;
