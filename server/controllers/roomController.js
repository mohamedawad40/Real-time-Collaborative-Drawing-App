const catchAsyncError = require("../utils.js/catchAsyncError");
const AppError = require("../utils.js/appError");
const Room = require("../models/Room");

const joinRoom = catchAsyncError(async (req, res, next) => {
    const { roomId } = req.params;
    if (!roomId) {
        return next(new AppError('Room ID is required', 400));
    }
    // Find the room by ID
    const room = await Room.findById(roomId);
    if (!room) {
        return next(new AppError('Room not found', 404));
    }
    // Check if the user is already a participant
    if (room.participants.includes(req.user._id)) {
        return next(new AppError('You are already a participant in this room', 400));
    }
    console.log('user', req.user);
    room.participants.push(req.user._id);
    await room.save();

    res.status(200).json({
        status: 'success',
        message: 'Joined the room successfully',
        data: {
            room
        }
    });
})

const createRoom = catchAsyncError(async (req, res, next) => {
    const { roomName, roomType } = req.body;
    if (!roomName) {
        return next(new AppError('Room name is required', 400));
    }
    // Create a new room
    const newRoom = await Room.create({
        name: roomName,
        roomType,
        participants: [req.user._id]
    });

    res.status(201).json({
        status: 'success',
        data: {
            room: newRoom
        }
    });
})

module.exports = { createRoom, joinRoom };