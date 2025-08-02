const { validationResult } = require("express-validator");
const userService = require('../services/user.service');


//function get all user
const getAllUsers = async (req, res) => {
    try {
        //get all users from database
        const users = await userService.getAllUsers();
        //send response
        res.status(200).json({
            success: true,
            message: "Get All Users Successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


//function create user
const createUser = async (req, res) => {
    //check validation results
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //if errors callback to users
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        // insert data
        const { name, email, password } = req.body;
        
        const user = await userService.createUser({
            name, 
            email,
            password
        });

        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: user,
        })
    } catch (error) {
        console.error("Error saat create user:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    getAllUsers,
    createUser,
}