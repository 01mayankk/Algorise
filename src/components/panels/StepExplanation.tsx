"use client";

import React from 'react';
import { useVisualizationStore } from '@/store/visualizationStore';

export function StepExplanation() {
  const { steps, currentStep } = useVisualizationStore();
  
  if (steps.length === 0) {
    return (
      <div className="w-full min-h-[80px] flex items-center justify-center p-4 bg-background/50 backdrop-blur border rounded-xl shadow-sm text-muted-foreground">
        Select an algorithm and press Play to see explanations.
      </div>
    );
  }

  // Handle currentStep which might be at the end (steps.length)
  const stepIndex = Math.min(currentStep, steps.length - 1);
  const currentMessage = steps[stepIndex]?.message || "Algorithm finished.";

  return (
    <div className="w-full min-h-[80px] flex flex-col justify-center p-4 bg-background/80 backdrop-blur border rounded-xl shadow-sm">
      <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
        Step {stepIndex + 1} of {steps.length}
      </div>
      <div className="text-sm md:text-base text-foreground font-medium">
        {currentMessage}
      </div>
    </div>
  );
}
