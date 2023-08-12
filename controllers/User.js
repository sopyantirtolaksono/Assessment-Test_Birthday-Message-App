import Users from "../models/UserModel.js";

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        return res.status(200).json(users);
    } catch(error) {
        return res.json({ message: error.message });
    };
};

// Add new user
export const addUser = async (req, res) => {
    try {
        const {firstName, lastName, email, birthdayDate, location} = req.body;

        await Users.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            birthday_date: birthdayDate,
            location: location
        });

        return res.status(201).json({ message: "created" });
    } catch(error) {
        return res.json({ message: error.message });
    };
};

// Delete user by ID
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if(!userId || !/^[1-9]\d*$/.test(userId)) {
            return res.status(400).json({ message: "bad request" });
        }

        const user = await Users.findOne({
            where: {
                id: userId
            }
        });

        if(!user) {
            return res.status(404).json({ message: "not found" });
        };

        await user.destroy();
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.json({ message: error.message });
    };
};

// Update user by ID
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if(!userId || !/^[1-9]\d*$/.test(userId)) {
            return res.status(400).json({ message: "bad request" });
        }

        const user = await Users.findOne({
            where: {
                id: userId
            }
        });

        if(!user) {
            return res.status(404).json({ message: "not found" });
        };

        const {firstName, lastName, email, birthdayDate, location} = req.body;
        user.first_name = firstName;
        user.last_name = lastName;
        user.email = email;
        user.birthday_date = birthdayDate;
        user.location = location;

        await user.save();
        return res.status(200).json({ message: "updated" });
    } catch(error) {
        return res.json({ message: error.message });
    };
};