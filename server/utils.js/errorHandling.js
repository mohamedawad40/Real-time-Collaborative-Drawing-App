const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const msgs = Object.values(err.errors).map(e => e.message).join('. ');
        console.log('error', msgs);
        return res.status(400).json({ message: msgs });
    }

    const status = err.statusCode || 500;
    console.error('Error:', err.message || err);
    res.status(status).json({ message: err.message || 'Something went wrong' });
};


module.exports = errorHandler;