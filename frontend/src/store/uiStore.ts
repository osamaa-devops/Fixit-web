import { create } from 'zustand';

interface AuthGateModalState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  icon: string;
  openModal: (title?: string, subtitle?: string, icon?: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<AuthGateModalState>((set) => ({
  isOpen: false,
  title: 'سجل دخولك أولاً',
  subtitle: 'للوصول إلى هذه الميزة تحتاج إلى حساب على منصة FixIt. سجلك مجاناً الآن وابدأ فوراً.',
  icon: '🔒',
  openModal: (title, subtitle, icon) => set(() => ({ 
    isOpen: true, 
    title: title || 'سجل دخولك أولاً',
    subtitle: subtitle || 'للوصول إلى هذه الميزة تحتاج إلى حساب على منصة FixIt. سجلك مجاناً الآن وابدأ فوراً.',
    icon: icon || '🔒'
  })),
  closeModal: () => set({ isOpen: false }),
}));
