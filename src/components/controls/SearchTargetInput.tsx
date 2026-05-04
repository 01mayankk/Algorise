"use client";

import React from 'react';
import { useDataStore } from '@/store/dataStore';
import { useVisualizationStore } from '@/store/visualizationStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SearchTargetInput() {
  const { searchTarget, setSearchTarget } = useDataStore();
  const { isPlaying, steps } = useVisualizationStore();
  
  const isLocked = isPlaying || steps.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setSearchTarget(val);
    } else if (e.target.value === '') {
       // Allow empty state briefly while typing, but default to 0 to avoid NaN
       setSearchTarget(0);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-background/80 backdrop-blur px-4 py-2 rounded-xl border shadow-sm">
      <Label htmlFor="searchTarget" className="whitespace-nowrap font-medium text-sm">
        Search Target:
      </Label>
      <Input
        id="searchTarget"
        type="number"
        value={searchTarget}
        onChange={handleChange}
        disabled={isLocked}
        className="w-24 font-mono h-8"
      />
    </div>
  );
}
