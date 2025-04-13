import { UserRole } from "~/types";
import { SxProps } from '@mui/material'

export interface UserResponse {
  id: string
  role: UserRole[]
  firstName: string
  lastName: string
  email: string
  photo?: string | null
  lastLogin: string
  createdAt: string
  updatedAt: string
  bookmarkedEvents: string[]
}

export interface UserProfileInfoSx {
  root?: SxProps
  name?: SxProps
  avatar?: SxProps
  date?: SxProps
  info?: SxProps
  interlocutorInfo?: SxProps
  myInfo?: SxProps
}


export interface GoogleAuthParams {
  token: string;
  role?: UserRole;
}
export interface LoginParams {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
}
export interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}
export interface SignupResponse {
  userId: string;
  userEmail: string;
}
