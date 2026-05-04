"use client";

import React, { useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { sortingAlgorithmsMap } from '@/algorithms/sorting/index';
import { useDataStore } from '@/store/dataStore';
import { useVisualizationStore } from '@/store/visualizationStore';
import { useUIStore } from '@/store/uiStore';

import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { SpeedSlider } from '@/components/controls/SpeedSlider';
import { ArrayInput } from '@/components/controls/ArrayInput';
import { StepExplanation } from '@/components/panels/StepExplanation';
import { ComplexityBadge } from '@/components/panels/ComplexityBadge';
import { CodePanel } from '@/components/visualizers/CodePanel';
import { QuizModal } from '@/components/quiz/QuizModal';

export default function SortingAlgorithmPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const algorithm = sortingAlgorithmsMap[slug];

  const array = useDataStore((state) => state.array);
  const setSteps = useVisualizationStore((state) => state.setSteps);
  const resetVisualization = useVisualizationStore((state) => state.resetVisualization);
  const setSelectedAlgorithm = useUIStore((state) => state.setSelectedAlgorithm);

  if (!algorithm) {
    notFound();
  }

  // Set the selected algorithm globally
  useEffect(() => {
    setSelectedAlgorithm(algorithm);
    return () => setSelectedAlgorithm(null);
  }, [algorithm, setSelectedAlgorithm]);

  // Memoize and calculate steps when array or algorithm changes
  const computedSteps = useMemo(() => {
    return algorithm.run(array);
  }, [array, algorithm]);

  // Update visualization store when steps change
  useEffect(() => {
    resetVisualization();
    setSteps(computedSteps);
  }, [computedSteps, setSteps, resetVisualization]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{algorithm.name}</h1>
          <p className="text-muted-foreground text-sm max-w-3xl">
            {algorithm.description}
          </p>
        </div>
        <QuizModal algorithm={algorithm} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Visualizer & Controls */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ArrayInput />
          
          <div className="relative">
            <ArrayVisualizer />
            <div className="absolute bottom-4 left-0 w-full flex justify-center px-4">
               <div className="flex flex-wrap justify-center gap-4">
                 <PlaybackControls />
                 <SpeedSlider />
               </div>
            </div>
          </div>

          <StepExplanation />
        </div>

        {/* Right Column: Code & Complexity */}
        <div className="flex flex-col gap-6">
          <ComplexityBadge algorithm={algorithm} />
          <CodePanel algorithm={algorithm} />
        </div>

      </div>
    </div>
  );
}
