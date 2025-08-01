//import express validator
const { body } = require('express-validator');

//definisikan validasi untuk post
const validateUser= [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('jobs').notEmpty().withMessage('Jobs is required'),
];

module.exports = { validateUser };