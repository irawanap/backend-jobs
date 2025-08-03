const prisma = require('../model/prisma');

// Get All Users
exports.getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });
};

// // Get User By ID
// exports.findUserById = async (id) => {
//     return await prisma.user.findUnique({
//         where: { id }
//     });
// };

// // Update User By ID
// exports.updateUser = async (id, newUserData) => {
//     return await prisma.user.update({
//         where: { id },
//         data: newUserData
//     });
// };

// // Delete User By ID
// exports.deleteUser = async (id) => {
//     return await prisma.user.delete({
//         where: { id }
//     });
// };
