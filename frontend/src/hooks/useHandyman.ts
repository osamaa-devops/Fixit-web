import { useQuery, useMutation } from '@tanstack/react-query';
import { useHandymanStore } from '../store/handymanStore';
import { handymanService } from '../services/handyman.service';

export const useHandymanProfile = (handymanId?: string) => {
  return useQuery({
    queryKey: ['handymanProfile', handymanId],
    queryFn: () =>
      handymanId
        ? handymanService.getProfile(handymanId)
        : Promise.reject('No ID provided'),
    enabled: !!handymanId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSearchHandymen = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any
) => {
  return useQuery({
    queryKey: ['handymen', filters],
    queryFn: () => handymanService.searchHandymen(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyJobs = (status?: string) => {
  const { setJobs } = useHandymanStore();

  return useQuery({
    queryKey: ['myJobs', status],
    queryFn: async () => {
      const data = await handymanService.getMyJobs(status);
      setJobs(data);
      return data;
    },
    staleTime: 1000 * 30,
  });
};

export const useAcceptJob = () => {
  const { updateJob } = useHandymanStore();

  return useMutation({
    mutationFn: (jobId: string) => handymanService.acceptJob(jobId),
    onSuccess: (data) => {
      updateJob(data.id, { status: 'accepted' });
    },
  });
};

export const useCompleteJob = () => {
  const { updateJob } = useHandymanStore();

  return useMutation({
    mutationFn: (jobId: string) => handymanService.completeJob(jobId),
    onSuccess: (data) => {
      updateJob(data.id, { status: 'completed' });
    },
  });
};

export const useCancelJob = () => {
  const { updateJob } = useHandymanStore();

  return useMutation({
    mutationFn: (data: { jobId: string; reason?: string }) =>
      handymanService.cancelJob(data.jobId, data.reason),
    onSuccess: (data) => {
      updateJob(data.id, { status: 'cancelled' });
    },
  });
};

export const usePortfolio = (handymanId: string) => {
  return useQuery({
    queryKey: ['portfolio', handymanId],
    queryFn: () => handymanService.getPortfolio(handymanId),
    enabled: !!handymanId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useAddPortfolioItem = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      handymanService.addPortfolioItem(formData),
  });
};

export const useDeletePortfolioItem = () => {
  return useMutation({
    mutationFn: (portfolioId: string) =>
      handymanService.deletePortfolioItem(portfolioId),
  });
};

export const useHandymanReviews = (handymanId: string) => {
  return useQuery({
    queryKey: ['reviews', handymanId],
    queryFn: () => handymanService.getReviews(handymanId),
    enabled: !!handymanId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateHandymanSettings = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => handymanService.updateSettings(data),
  });
};

export const useHandymanNotifications = () => {
  return useQuery({
    queryKey: ['handymanNotifications'],
    queryFn: () =>
      fetch('/api/handymen/notifications').then((r) => r.json()),
    staleTime: 1000 * 30,
  });
};
