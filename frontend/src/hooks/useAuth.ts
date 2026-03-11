import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials, RegisterData, AuthResponse } from '../services/auth.service';
import { authService } from '../services/auth.service';

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      return response;
    },
    onSuccess: (data: AuthResponse) => {
      login(data.token, data.user);
    },
  });
};

export const useRegister = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await authService.register(data);
      return response;
    },
    onSuccess: (data: AuthResponse) => {
      login(data.token, data.user);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data: { email: string; otp: string }) =>
      authService.verifyOTP(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: {
      email: string;
      token: string;
      newPassword: string;
      confirmPassword: string;
    }) => authService.resetPassword(data),
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
