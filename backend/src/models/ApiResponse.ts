interface ApiResponse {
    message: string;
}

export const apiResponse = (message: string): ApiResponse => {
    return {message};
}

export default ApiResponse;