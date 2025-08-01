const { PrismaClient } = require('@prisma/client');
const prisma  = new PrismaClient();
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

//function get all user
const findUsers = async (req, res) => {
    try {
        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                jobs: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get All Users Successfully",
            data: users
        });
    } catch (error) {
        res.status(500).send({
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

        const hashedPassword = await bcrypt.hash(req.body.password, 6);

        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                jobs: req.body.jobs,
                password: hashedPassword,
            },
        });

        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: userData,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    findUsers,
    createUser,
}