import { create } from 'zustand';
import { Algorithm } from '@/lib/types';

interface UIState {
  selectedAlgorithm: Algorithm | null;
  isSidebarOpen: boolean;
  setSelectedAlgorithm: (algo: Algorithm | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedAlgorithm: null,
  isSidebarOpen: true,
  setSelectedAlgorithm: (algo) => set({ selectedAlgorithm: algo }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
