import type { AdminUser } from "./adminTypes";
import type { OverviewEvent } from "./homeTypes";

// Health endpoint successful response
export type HealthResponse = {
    data: 'healthy';
};

// Health endpoint error response
export type HealthError = {
    status: number;
    error: string;
};

// Login endpoint request body
export type LoginRequest = {
    email: string;
    password: string;
};

// Login endpoint successful response
export type LoginResponse = {
    access_token: string;
    refresh_token: string;
};

// Login endpoint error response
export type LoginError = {
    status: number;
    error: string;
};

// Refresh token endpoint request body
export type RefreshTokenRequest = {
    refresh_token: string;
};

// Refresh token endpoint successful response
export type RefreshTokenResponse = {
    access_token: string;
    refresh_token?: string;
};

// Refresh token endpoint error response
export type RefreshTokenError = {
    status: number;
    error: string;
};

// Admin user endpoint successful response
export type AdminUserResponse = AdminUser;

// Admin user endpoint error response
export type AdminUserError = {
    status: number;
    error: string;
};

// Event overview endpoint successful response
export type EventOverviewResponse = OverviewEvent[];

// Event overview endpoint error response
export type EventOverviewError = {
    status: number;
    error: string;
};