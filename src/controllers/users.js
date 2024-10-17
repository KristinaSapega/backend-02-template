const User = require('../models/user');


const getUsers = (request, response) => {
    //Get users
    return User.find({})
        .then((users) => {
            response.status(200).send(users);
        })
        .catch((error) => response.status(500).send(error.message));
};

const getUser = (request, response) => {
    //Get user
    const { user_id } = request.params;
    User.findById(user_id)
        .then(user => {
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            } response.status(200).join(user);
        })
        .catch(error => {
            response.status(500).json({ message: error.message })
        })
};

const createUser = (request, response) => {
    //Create user
    const newUser = new User({
        name: request.body.name,
        lastName: request.body.lastName,
        username: request.body.username
    });
    newUser.save()
        .then(savedUser => {
            response.status(201).json(savedUser);
        })
        .catch(error => {
            response.status(400).json({ message: error.message });
        });
};

const updateUser = (request, response) => {
    //Update user
    const { user_id } = request.params;
    User.findByIdAndUpdate(user_id, request.body, { new: true, runValidators: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return response.status(404).json({ message: "User not found" });
            }
            response.status(200).json(updatedUser);
        })
        .catch(error => {
            response.status(400).json({ message: error.message });
        });
};

const deleteUser = (request, response) => {
    //Delete user
    const { user_id } = request.params;
    User.findByIdAndDelete(user_id)
        .then(deletedUser => {
            if (!deletedUser) {
                return response.status(404).json({ message: "User not found" });
            }
            response.status(200).json({ message: "User deleted successfully" });
        })
        .catch(error => {
            response.status(500).json({ message: error.message });
        });
};



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
