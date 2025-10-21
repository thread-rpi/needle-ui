// Health endpoint healthy response
export type HealthResponse = {
    data: 'healthy';
};

// Health endpoint error response
export type HealthError = {
    status: number;
    error: string;
};