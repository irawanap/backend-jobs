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
        case "createJob": // Aturan validasi untuk membuat pekerjaan baru
            return handleValidation([
                check("company").notEmpty().withMessage("Company is required"),
                check("position")
                .notEmpty()
                .withMessage("Position is required"),
                // menambahkan validasi untuk status jika ingin membatasi nilai enum
                // check('status').isIn(['applied', 'interview', 'offer', 'rejected']).withMessage('Invalid job status'),
                // check('appliedDate').isISO8601().toDate().withMessage('Invalid applied date format (YYYY-MM-DD)'),
                // check('offerDate').optional().isISO8601().toDate().withMessage('Invalid offer date format (YYYY-MM-DD)'),
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
