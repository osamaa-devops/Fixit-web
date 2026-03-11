import { useQuery, useMutation } from '@tanstack/react-query';
import { adminService } from '../services/admin.service';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => adminService.getDashboardStats(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const usePendingHandymen = () => {
  return useQuery({
    queryKey: ['pendingHandymen'],
    queryFn: () => adminService.getPendingHandymen(20, 0),
    staleTime: 1000 * 60,
  });
};

export const useApproveHandyman = () => {
  return useMutation({
    mutationFn: (data: { handymanId: string; reason?: string }) =>
      adminService.approveHandyman(data.handymanId, data.reason),
  });
};

export const useRejectHandyman = () => {
  return useMutation({
    mutationFn: (data: { handymanId: string; reason: string }) =>
      adminService.rejectHandyman(data.handymanId, data.reason),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => adminService.getCategories(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCreateCategory = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => adminService.createCategory(data),
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: { categoryId: string; updates: any }) =>
      adminService.updateCategory(data.categoryId, data.updates),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (categoryId: string) => adminService.deleteCategory(categoryId),
  });
};

export const useComplaints = (status?: string) => {
  return useQuery({
    queryKey: ['complaints', status],
    queryFn: () => adminService.getComplaints(status, 50),
    staleTime: 1000 * 60,
  });
};

export const useResolveComplaint = () => {
  return useMutation({
    mutationFn: (data: { complaintId: string; resolution: string }) =>
      adminService.resolveComplaint(data.complaintId, data.resolution),
  });
};

export const useLiveRequests = () => {
  return useQuery({
    queryKey: ['liveRequests'],
    queryFn: () => adminService.getLiveRequests(),
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

export const useAllUsers = (role?: 'customer' | 'handyman') => {
  return useQuery({
    queryKey: ['users', role],
    queryFn: () => adminService.getAllUsers(role, 50, 0),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSuspendUser = () => {
  return useMutation({
    mutationFn: (data: { userId: string; reason: string }) =>
      adminService.suspendUser(data.userId, data.reason),
  });
};

export const useUnsuspendUser = () => {
  return useMutation({
    mutationFn: (userId: string) => adminService.unsuspendUser(userId),
  });
};
