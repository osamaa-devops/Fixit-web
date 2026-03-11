import apiClient from './api';

export interface ServiceRequest {
  id: string;
  handymanId: string;
  handymanName: string;
  category: string;
  description: string;
  status: 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled';
  scheduledDate: string;
  location: string;
  price: number;
  estimatedDuration: string;
  images?: string[];
  rating?: number;
  review?: string;
  totalAmount: number;
  createdAt: string;
  completedAt?: string;
}

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  savedAddresses: Array<{ id: string; label: string; address: string }>;
  memberSince: string;
  totalRequests: number;
  completedRequests: number;
  averageRating: number;
  tier: 'standard' | 'silver' | 'gold' | 'platinum';
}

export interface BookingData {
  handymanId: string;
  category: string;
  title: string;
  description: string;
  images?: string[];
  scheduledDate: string;
  location: string;
  price?: number;
  estimatedDuration: string;
}

export interface TrackingUpdate {
  status: string;
  location: string;
  eta: string;
  message: string;
}

export const customerService = {
  getProfile: async (): Promise<CustomerProfile> => {
    const response = await apiClient.get('/customers/me');
    return response.data;
  },

  updateProfile: async (data: Partial<CustomerProfile>) => {
    const response = await apiClient.put('/customers/me', data);
    return response.data;
  },

  getRequestHistory: async (
    limit?: number,
    offset?: number,
    status?: string
  ) => {
    const response = await apiClient.get(
      '/customers/me/requests',
      {
        params: { limit, offset, status },
      }
    );
    return response.data;
  },

  getRequestDetails: async (requestId: string): Promise<ServiceRequest> => {
    const response = await apiClient.get(`/requests/${requestId}`);
    return response.data;
  },

  createRequest: async (data: BookingData) => {
    const response = await apiClient.post('/requests', data);
    return response.data;
  },

  cancelRequest: async (requestId: string, reason?: string) => {
    const response = await apiClient.post(`/requests/${requestId}/cancel`, {
      reason,
    });
    return response.data;
  },

  trackRequest: async (requestId: string): Promise<TrackingUpdate> => {
    const response = await apiClient.get(`/requests/${requestId}/track`);
    return response.data;
  },

  rateRequest: async (
    requestId: string,
    rating: number,
    review: string
  ) => {
    const response = await apiClient.post(`/requests/${requestId}/rate`, {
      rating,
      review,
    });
    return response.data;
  },

  getNotifications: async (limit?: number) => {
    const response = await apiClient.get('/notifications', {
      params: { limit },
    });
    return response.data;
  },

  markNotificationAsRead: async (notificationId: string) => {
    const response = await apiClient.put(
      `/notifications/${notificationId}/read`
    );
    return response.data;
  },

  markAllNotificationsAsRead: async () => {
    const response = await apiClient.put('/notifications/read-all');
    return response.data;
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await apiClient.post(
      '/customers/me/upload-avatar',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },
};

export default customerService;
