const jwt = require("jsonwebtoken");
const AppError = require("../utils.js/appError");
const catchAsyncError = require("../utils.js/catchAsyncError");
const { promisify } = require('util');
const User = require("../models/User");

const protectRoute = catchAsyncError(async (req, res, next) => {
    //check if there is token
    let token;
    console.log('req', req.headers)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
        return next(
            new AppError('you are not logged in,please log in to have access', 401),
    );
    //verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if this user is still exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return new appError('this user is no longer exist', 401);
    }
    //here i added the user data to the request bs i may need it in the future
    req.user = freshUser;
    next();
});

const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    //check if email and password are provided
    if (!email || !password)
        return next(new AppError('please enter email and password', 404));

    //check if email and password exist
    const user = await User.findOne({ email }).select('+password');

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


module.exports = { register, login, protectRoute };