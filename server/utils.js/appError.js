class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indicates that this error is operational and not a programming error
    }
}

module.exports = appError;
