const { check, validationResult } = require('express-validator');

const handleValidation = (validations) => {
    return [
        ...validations,
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
};

const validate = (type) => {
    switch (type) {
        case 'register':
            return handleValidation([
                check('name').notEmpty().withMessage('Name is required'),
                check('email').isEmail().withMessage('Email is invalid'),
                check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
            ]);
        case 'login':
            return handleValidation([
                check('email').isEmail().withMessage('Email is invalid'),
                check('password').notEmpty().withMessage('Password is required')
            ]);
        case 'getAllUsers':
            return handleValidation([
                // Tambahkan validasi jika perlu, misal query param
            ]);
        default:
            return [];
    }
};

module.exports = { validate };
