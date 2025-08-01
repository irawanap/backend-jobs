const express = require('express')
const router = express.Router();
const UserController = require('../controllers/userController');
const { validateUser } = require('../utils/validators');

router.get('/users', UserController.findUsers);

router.post('/users', validateUser, UserController.createUser);

module.exports = router