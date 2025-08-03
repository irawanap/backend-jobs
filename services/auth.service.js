const prisma = require("../model/prisma")

// register user
exports.registerUser = async (user) => {
    return await prisma.user.create({
        data: user
    });
};

// login user
exports.findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

