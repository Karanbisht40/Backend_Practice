// ApiResponse class is used to keep all successful API responses
// in a common and consistent format.

class ApiResponse {

    constructor(
        statusCode,       // HTTP status code (200, 201, etc.)
        data,             // Actual data that we want to send to client
        message = "success" // Default success message
    ) {

        // Store the HTTP status code
        this.statusCode = statusCode

        // Store the actual response data
        this.data = data

        // Store the response message
        this.message = message

        // If status code is less than 400, request is considered successful
        this.success = statusCode < 400
    }
}

export { ApiResponse }