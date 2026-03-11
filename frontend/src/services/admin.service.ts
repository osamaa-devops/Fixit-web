import apiClient from './api';

export interface PendingHandyman {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  yearsOfExperience: number;
  avatar: string;
  submittedAt: string;
  documents: string[];
  verificationStatus: 'pending' | 'approved' | 'rejected';
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  estimatedPrice: number;
  isActive: boolean;
  handymenCount: number;
  requestsCount: number;
}

export interface ComplaintReview {
  id: string;
  type: 'complaint' | 'review';
  handymanId: string;
  customerId: string;
  requestId: string;
  title: string;
  content: string;
  rating?: number;
  status: 'pending' | 'resolved' | 'rejected';
  submittedAt: string;
  resolvedAt?: string;
}

export interface LiveRequest {
  id: string;
  customerId: string;
  handymanId: string;
  category: string;
  status: 'pending' | 'accepted' | 'active' | 'completed';
  location: string;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalHandymen: number;
  totalRequests: number;
  totalRevenue: number;
  pendingApprovals: number;
  activeRequests: number;
  averageRating: number;
  platformGrowth: number;
}

export const adminService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  getPendingHandymen: async (limit?: number, offset?: number) => {
    const response = await apiClient.get('/admin/handymen/pending', {
      params: { limit, offset },
    });
    return response.data;
  },

  approveHandyman: async (handymanId: string, reason?: string) => {
    const response = await apiClient.post(
      `/admin/handymen/${handymanId}/approve`,
      { reason }
    );
    return response.data;
  },

  rejectHandyman: async (handymanId: string, reason: string) => {
    const response = await apiClient.post(
      `/admin/handymen/${handymanId}/reject`,
      { reason }
    );
    return response.data;
  },

  getCategories: async (): Promise<ServiceCategory[]> => {
    const response = await apiClient.get('/admin/categories');
    return response.data;
  },

  createCategory: async (data: Partial<ServiceCategory>) => {
    const response = await apiClient.post('/admin/categories', data);
    return response.data;
  },

  updateCategory: async (categoryId: string, data: Partial<ServiceCategory>) => {
    const response = await apiClient.put(`/admin/categories/${categoryId}`, data);
    return response.data;
  },

  deleteCategory: async (categoryId: string) => {
    const response = await apiClient.delete(`/admin/categories/${categoryId}`);
    return response.data;
  },

  getComplaints: async (status?: string, limit?: number) => {
    const response = await apiClient.get('/admin/complaints', {
      params: { status, limit },
    });
    return response.data;
  },

  resolveComplaint: async (complaintId: string, resolution: string) => {
    const response = await apiClient.put(`/admin/complaints/${complaintId}`, {
      status: 'resolved',
      resolution,
    });
    return response.data;
  },

  getLiveRequests: async (): Promise<LiveRequest[]> => {
    const response = await apiClient.get('/admin/requests/live');
    return response.data;
  },

  getAllUsers: async (
    role?: 'customer' | 'handyman',
    limit?: number,
    offset?: number
  ) => {
    const response = await apiClient.get('/admin/users', {
      params: { role, limit, offset },
    });
    return response.data;
  },

  suspendUser: async (userId: string, reason: string) => {
    const response = await apiClient.post(`/admin/users/${userId}/suspend`, {
      reason,
    });
    return response.data;
  },

  unsuspendUser: async (userId: string) => {
    const response = await apiClient.post(`/admin/users/${userId}/unsuspend`);
    return response.data;
  },
};

export default adminService;
