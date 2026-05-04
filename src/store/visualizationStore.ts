import { create } from 'zustand';
import { Step } from '@/lib/types';

interface VisualizationState {
  speed: number;
  isPlaying: boolean;
  currentStep: number;
  steps: Step[];
  setSpeed: (speed: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentStep: (step: number) => void;
  setSteps: (steps: Step[]) => void;
  resetVisualization: () => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  speed: 1,
  isPlaying: false,
  currentStep: 0,
  steps: [],
  setSpeed: (speed) => set({ speed }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setSteps: (steps) => set({ steps }),
  resetVisualization: () => set({ isPlaying: false, currentStep: 0, steps: [] }),
}));
