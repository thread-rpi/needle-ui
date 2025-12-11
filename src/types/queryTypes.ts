// Health endpoint healthy response
export type HealthResponse = {
    data: 'healthy';
};

// Health endpoint error response
export type HealthError = {
    status: number;
    error: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

export type LoginError = {
    status: number;
    error: string;
};