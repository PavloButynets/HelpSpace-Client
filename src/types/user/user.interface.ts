import {UserRole} from "~/types";

export interface GoogleAuthParams {
    token: string
    role?: UserRole
}
export interface LoginParams {
    email: string
    password: string
}
export interface LoginResponse {
    accessToken: string
}
export interface SignupParams {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    role: UserRole
}
export interface SignupResponse {
    userId: string
    userEmail: string
}
