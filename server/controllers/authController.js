const AppError = require("../utils.js/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const register = async (req, res, next) => {
    try {
        // Extract user data from request body
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError('User already exists', 400));
        }
        // If user does not exist, create a new user
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();
        const token = signToken(newUser._id);
        return res.status(201).json({ status: 'success', token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return next(new AppError('Error registering user', 500));
    }
}


module.exports = { register }