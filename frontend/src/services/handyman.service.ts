import apiClient from './api';

export interface HandymanProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  specialization: string;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  yearsOfExperience: number;
  certifications: string[];
  phone: string;
  location: string;
  bio: string;
  averagePrice?: number;
  responseTime?: string;
  completedJobs?: number;
  verified: boolean;
}

export interface Job {
  id: string;
  customerId: string;
  handymanId: string;
  category: string;
  title: string;
  description: string;
  status: 'new' | 'accepted' | 'active' | 'completed' | 'cancelled';
  scheduledDate: string;
  location: string;
  price: number;
  estimatedDuration: string;
  images?: string[];
  createdAt: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  completionDate: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  jobId: string;
}

export const handymanService = {
  getProfile: async (handymanId: string): Promise<HandymanProfile> => {
    const response = await apiClient.get(`/handymen/${handymanId}`);
    return response.data;
  },

  searchHandymen: async (filters: {
    location?: string;
    specialization?: string;
    minRating?: number;
    available?: boolean;
  }) => {
    const response = await apiClient.get('/handymen', { params: filters });
    return response.data;
  },

  getMyJobs: async (status?: string) => {
    const response = await apiClient.get('/handymen/me/jobs', {
      params: { status },
    });
    return response.data;
  },

  acceptJob: async (jobId: string) => {
    const response = await apiClient.post(`/jobs/${jobId}/accept`);
    return response.data;
  },

  completeJob: async (jobId: string) => {
    const response = await apiClient.post(`/jobs/${jobId}/complete`);
    return response.data;
  },

  cancelJob: async (jobId: string, reason?: string) => {
    const response = await apiClient.post(`/jobs/${jobId}/cancel`, { reason });
    return response.data;
  },

  getPortfolio: async (handymanId: string): Promise<Portfolio[]> => {
    const response = await apiClient.get(`/handymen/${handymanId}/portfolio`);
    return response.data;
  },

  addPortfolioItem: async (data: FormData) => {
    const response = await apiClient.post('/handymen/me/portfolio', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deletePortfolioItem: async (portfolioId: string) => {
    const response = await apiClient.delete(
      `/handymen/me/portfolio/${portfolioId}`
    );
    return response.data;
  },

  getReviews: async (handymanId: string): Promise<Review[]> => {
    const response = await apiClient.get(
      `/handymen/${handymanId}/reviews`
    );
    return response.data;
  },

  updateSettings: async (data: Partial<HandymanProfile>) => {
    const response = await apiClient.put('/handymen/me', data);
    return response.data;
  },
};

export default handymanService;
