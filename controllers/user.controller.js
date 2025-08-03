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
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



module.exports = {
    getAllUsers,
}