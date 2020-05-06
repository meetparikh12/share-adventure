class ErrorHandling extends Error {
    constructor(message, statusCode) {
        super(message) // Adds message property to Error object
        this.statusCode = statusCode // Adds statusCode propety to Error Object
    }
}

module.exports = ErrorHandling;