const AppError = require("../utils.js/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsyncError = require("../utils.js/catchAsyncError");


const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    //check if email and password are provided
    if (!email || !password)
        return next(new AppError('please enter email and password', 404));

    //check if email and password exist
    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Invalid email or password', 401));
    }
    const token = signToken(user._id);
    res.status(201).json({
        status: 'success',
        token,
    });
});

const signToken = function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const register = catchAsyncError(async (req, res, next) => {
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
    }
);


module.exports = { register, login };