const express = require('express')
const router = express.Router();
const UserController = require('../controllers/userController');
const { validateUser } = require('../utils/validators');
const logger = require("../middleware/logger");

router.get('/users', logger, UserController.findUsers);

router.post('/users', logger, validateUser, UserController.createUser);

module.exports = router