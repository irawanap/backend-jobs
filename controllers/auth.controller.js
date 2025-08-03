const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");

// register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User with this email already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await authService.registerUser({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: true,
            message: "User registered successfully.",
            data: { 
                id: newUser.id,
                name: newUser.name,
                email: newUser.email 
            }
        });
    } catch (error) {
        console.error("Error during registration:", error)
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables!");
            return res.status(500).json({
                success: false,
                message: "Server configuration error: JWT secret missing.",
            });
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET, 
        { expiresIn: "1h"});

        res.status(200).json({
            success: true,
            message: "Login successfull.",
            token
        })
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};


