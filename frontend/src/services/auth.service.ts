import apiClient from './api';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  role: 'customer' | 'handyman';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  // Handyman specific
  specialization?: string;
  yearsOfExperience?: number;
  certifications?: string[];
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'customer' | 'handyman' | 'admin';
    avatar?: string;
    verified: boolean;
    approvalStatus?: 'pending' | 'approved' | 'rejected'; // for handymen
  };
}

export interface OTPVerifyData {
  email: string;
  otp: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  verifyOTP: async (data: OTPVerifyData) => {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

export default authService;
