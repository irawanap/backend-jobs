const express = require('express')
const router = express.Router();
const UserController = require('../controllers/userController');
const { validateUser } = require('../middleware/validateUser');
const logger = require("../utils/logger");

router.get('/users', logger, UserController.getAllUsers);

router.post('/users', logger, validateUser, UserController.createUser);

module.exports = router