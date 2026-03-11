import { create } from 'zustand';

export interface ServiceRequest {
  id: string;
  handymanId: string;
  handymanName: string;
  category: string;
  status: 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled';
  scheduledDate: string;
  location: string;
  price: number;
  totalAmount: number;
}

interface CustomerStore {
  requests: ServiceRequest[];
  currentRequest: ServiceRequest | null;
  isLoading: boolean;
  error: string | null;

  setRequests: (requests: ServiceRequest[]) => void;
  setCurrentRequest: (request: ServiceRequest | null) => void;
  addRequest: (request: ServiceRequest) => void;
  updateRequest: (id: string, updates: Partial<ServiceRequest>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  requests: [],
  currentRequest: null,
  isLoading: false,
  error: null,

  setRequests: (requests) => set({ requests }),
  setCurrentRequest: (currentRequest) => set({ currentRequest }),

  addRequest: (request) =>
    set((state) => ({
      requests: [request, ...state.requests],
    })),

  updateRequest: (id, updates) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
      currentRequest:
        state.currentRequest?.id === id
          ? { ...state.currentRequest, ...updates }
          : state.currentRequest,
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useCustomerStore;
