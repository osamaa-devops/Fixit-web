import { create } from 'zustand';

export interface Job {
  id: string;
  customerId: string;
  category: string;
  title: string;
  status: 'new' | 'accepted' | 'active' | 'completed' | 'cancelled';
  scheduledDate: string;
  price: number;
}

interface HandymanStore {
  jobs: Job[];
  currentJob: Job | null;
  isLoading: boolean;
  error: string | null;
  acceptedJobsCount: number;
  completedJobsCount: number;

  setJobs: (jobs: Job[]) => void;
  setCurrentJob: (job: Job | null) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setStats: (accepted: number, completed: number) => void;
  clearError: () => void;
}

export const useHandymanStore = create<HandymanStore>((set) => ({
  jobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
  acceptedJobsCount: 0,
  completedJobsCount: 0,

  setJobs: (jobs) => set({ jobs }),
  setCurrentJob: (currentJob) => set({ currentJob }),

  updateJob: (id, updates) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === id ? { ...j, ...updates } : j
      ),
      currentJob:
        state.currentJob?.id === id
          ? { ...state.currentJob, ...updates }
          : state.currentJob,
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setStats: (accepted, completed) =>
    set({
      acceptedJobsCount: accepted,
      completedJobsCount: completed,
    }),
  clearError: () => set({ error: null }),
}));

export default useHandymanStore;
