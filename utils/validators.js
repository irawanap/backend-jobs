const { check, validationResult } = require('express-validator');

const validateUser = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength().withMessage('Password is invalid'),
    check('name').notEmpty().withMessage('Name is invalid'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: "Validation error",
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = { validateUser };