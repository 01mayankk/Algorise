"use client";

import React from 'react';
import { Play, Pause, Square, RotateCcw, StepBack, StepForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVisualizationStore } from '@/store/visualizationStore';

export function PlaybackControls() {
  const { isPlaying, setIsPlaying, currentStep, steps, resetVisualization } = useVisualizationStore();
  const hasSteps = steps.length > 0;
  const isFinished = currentStep >= steps.length && hasSteps;

  const handlePlayPause = () => {
    if (isFinished) {
      // Replay from start
      // Note: we need a way to scrub the GSAP timeline back to 0. 
      // This will be handled if we tie the `currentStep` to the timeline progress in a robust way,
      // but for now we just toggle state.
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Ideally scrub timeline to 0 without resetting data
  };

  return (
    <div className="flex items-center gap-2 bg-background/80 backdrop-blur p-2 rounded-lg border shadow-sm">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => {}} 
        disabled={!hasSteps || currentStep === 0}
        title="Previous Step"
      >
        <StepBack className="h-4 w-4" />
      </Button>

      <Button 
        variant={isPlaying ? "default" : "secondary"} 
        size="icon" 
        onClick={handlePlayPause}
        disabled={!hasSteps}
        title={isPlaying ? "Pause" : "Play"}
        className="w-10 h-10"
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleStop}
        disabled={!hasSteps || currentStep === 0}
        title="Stop"
      >
        <Square className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => resetVisualization()}
        title="Reset"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => {}} 
        disabled={!hasSteps || isFinished}
        title="Next Step"
      >
        <StepForward className="h-4 w-4" />
      </Button>
    </div>
  );
}
