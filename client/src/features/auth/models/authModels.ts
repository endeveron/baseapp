import { User } from 'features/user';

// auth form

export interface LoginFormData {
  email: string;
  password: string;
  [key: string]: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}

export interface AuthFormProps<AuthFormData> {
  isLoading: boolean;
  onSubmitted: (authData: AuthFormData) => void;
}

// api

export interface AuthReqData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResData {
  token: string;
  user: User;
}

// redux

export interface AuthSlice {
  token: string;
}
