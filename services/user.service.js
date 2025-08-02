const prisma = require('../model/prisma');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async () => {
    return await prisma.user.findMany();
}

exports.createUser = async ({ name, email, password }) => {

    const hashedPassword = await bcrypt.hash(password, 6);

    return await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });
}
