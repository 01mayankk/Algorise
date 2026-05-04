"use client";

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { useVisualizationStore } from '@/store/visualizationStore';

const SPEEDS = [0.25, 0.5, 1, 2, 4];

export function SpeedSlider() {
  const speed = useVisualizationStore((state) => state.speed);
  const setSpeed = useVisualizationStore((state) => state.setSpeed);

  // Find index of current speed
  const speedIndex = SPEEDS.indexOf(speed) !== -1 ? SPEEDS.indexOf(speed) : 2;

  return (
    <div className="flex items-center gap-4 bg-background/80 backdrop-blur p-2 px-4 rounded-lg border shadow-sm min-w-[200px]">
      <span className="text-xs font-medium text-muted-foreground w-12 text-right">
        {speed}x
      </span>
      <Slider
        value={[speedIndex]}
        min={0}
        max={SPEEDS.length - 1}
        step={1}
        onValueChange={(vals) => {
          const val = Array.isArray(vals) ? vals[0] : (vals as number);
          setSpeed(SPEEDS[val]);
        }}
        className="flex-1"
      />
    </div>
  );
}
