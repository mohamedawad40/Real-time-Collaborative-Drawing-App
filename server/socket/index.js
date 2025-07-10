module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('🟢 New client connected:', socket.id);

        // 🧠 Join Room
        socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`👤 ${userId} joined room ${roomId}`);

        socket.to(roomId).emit('user-joined', userId);
        });

        // 🎨 Drawing Event
        socket.on('drawing', (data) => {
        const { roomId, ...rest } = data;
        socket.to(roomId).emit('drawing', rest);
        });

        // 💬 Chat Message
        socket.on('chat-message', ({ roomId, message }) => {
        socket.to(roomId).emit('chat-message', message);
        });

        // ❌ Disconnect
        socket.on('disconnect', () => {
        console.log('🔴 Client disconnected:', socket.id);
        });
    });
};
