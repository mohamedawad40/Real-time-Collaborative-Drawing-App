const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    const message = err.message || 'Internal Server Error';
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message });
}

module.exports = errorHandler;