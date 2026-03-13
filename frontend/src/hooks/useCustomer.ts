import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomerStore } from '../store/customerStore';
import type { BookingData, CustomerProfile, ServiceRequest } from '../services/customer.service';
import { customerService } from '../services/customer.service';

export const useCustomerProfile = () => {
  return useQuery({
    queryKey: ['customerProfile'],
    queryFn: () => customerService.getProfile(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useUpdateCustomerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CustomerProfile>) => customerService.updateProfile(data),
    onSuccess: () => {
      // Invalidate profile cache after successful update
      queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
    },
  });
};

export const useRequestHistory = (status?: string) => {
  return useQuery({
    queryKey: ['requestHistory', status],
    queryFn: async (): Promise<ServiceRequest[]> => {
      const data = await customerService.getRequestHistory(20, 0, status);
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useRequestDetails = (requestId: string) => {
  const { setCurrentRequest } = useCustomerStore();

  return useQuery({
    queryKey: ['request', requestId],
    queryFn: async () => {
      const data = await customerService.getRequestDetails(requestId);
      setCurrentRequest(data);
      return data;
    },
    enabled: !!requestId,
    staleTime: 1000 * 30, // 30 seconds
  });
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  const { addRequest } = useCustomerStore();

  return useMutation({
    mutationFn: (data: BookingData) => customerService.createRequest(data),
    onSuccess: (data) => {
      addRequest(data);
      // Invalidate request history to reflect new request
      queryClient.invalidateQueries({ queryKey: ['requestHistory'] });
      queryClient.invalidateQueries({ queryKey: ['customerHistory'] });
    },
  });
};

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  const { updateRequest } = useCustomerStore();

  return useMutation({
    mutationFn: (data: { requestId: string; reason?: string }) =>
      customerService.cancelRequest(data.requestId, data.reason),
    onSuccess: (data) => {
      updateRequest(data.id, { status: 'cancelled' });
      // Invalidate related caches
      queryClient.invalidateQueries({ queryKey: ['requestHistory'] });
      queryClient.invalidateQueries({ queryKey: ['customerHistory'] });
      queryClient.invalidateQueries({ queryKey: ['request', data.id] });
    },
  });
};

export const useTrackRequest = (requestId: string) => {
  return useQuery({
    queryKey: ['trackRequest', requestId],
    queryFn: () => customerService.trackRequest(requestId),
    refetchInterval: 10000, // Refetch every 10 seconds
    enabled: !!requestId,
  });
};

export const useRateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      requestId: string;
      rating: number;
      review: string;
    }) => customerService.rateRequest(data.requestId, data.rating, data.review),
    onSuccess: (_, variables) => {
      // Invalidate request details and history
      queryClient.invalidateQueries({ queryKey: ['request', variables.requestId] });
      queryClient.invalidateQueries({ queryKey: ['requestHistory'] });
      queryClient.invalidateQueries({ queryKey: ['customerHistory'] });
    },
  });
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => customerService.getNotifications(50),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      customerService.markNotificationAsRead(notificationId),
    onSuccess: () => {
      // Invalidate notifications cache
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: (file: File) => customerService.uploadProfileImage(file),
  });
};
