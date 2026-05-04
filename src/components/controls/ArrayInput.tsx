"use client";

import React, { useState, useEffect } from 'react';
import { useDataStore } from '@/store/dataStore';
import { useVisualizationStore } from '@/store/visualizationStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shuffle, ArrowDownUp, Edit3 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ArrayInput() {
  const { array, setArray } = useDataStore();
  const { isPlaying, steps } = useVisualizationStore();
  
  const [size, setSize] = useState(array.length);
  const [manualInput, setManualInput] = useState(array.join(', '));
  const [mode, setMode] = useState<'random' | 'shuffled' | 'manual'>('random');

  const isLocked = isPlaying || steps.length > 0;

  // Generate random array
  const generateRandom = (newSize: number) => {
    const newArray = Array.from({ length: newSize }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setManualInput(newArray.join(', '));
  };

  // Generate shuffled sorted array (worst case often)
  const generateShuffled = (newSize: number) => {
    const newArray = Array.from({ length: newSize }, (_, i) => (i + 1) * 10);
    // Simple shuffle
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setArray(newArray);
    setManualInput(newArray.join(', '));
  };

  // Sync size slider to array
  const handleSizeChange = (vals: number | readonly number[]) => {
    const newSize = Array.isArray(vals) ? vals[0] : (vals as number);
    setSize(newSize);
    if (mode === 'random') {
      generateRandom(newSize);
    } else if (mode === 'shuffled') {
      generateShuffled(newSize);
    } else {
      // For manual, just trim or pad
      let newArr = [...array];
      if (newArr.length > newSize) {
        newArr = newArr.slice(0, newSize);
      } else {
        while (newArr.length < newSize) {
          newArr.push(Math.floor(Math.random() * 90) + 10);
        }
      }
      setArray(newArr);
      setManualInput(newArr.join(', '));
    }
  };

  const handleManualBlur = () => {
    const parsed = manualInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n));

    if (parsed.length >= 2 && parsed.length <= 20) {
      setArray(parsed);
      setSize(parsed.length);
      setManualInput(parsed.join(', '));
    } else {
      // Revert if invalid
      setManualInput(array.join(', '));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-background/80 backdrop-blur p-4 rounded-xl border shadow-sm w-full">
      
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Button 
              variant={mode === 'random' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => { setMode('random'); generateRandom(size); }}
              disabled={isLocked}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Random Array</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button 
              variant={mode === 'shuffled' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => { setMode('shuffled'); generateShuffled(size); }}
              disabled={isLocked}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Shuffled Sorted Array</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button 
              variant={mode === 'manual' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setMode('manual')}
              disabled={isLocked}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Manual Input</TooltipContent>
        </Tooltip>
      </div>

      {mode === 'manual' ? (
        <div className="flex-1 w-full">
          <Input 
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onBlur={handleManualBlur}
            disabled={isLocked}
            placeholder="e.g. 8, 3, 5, 1, 9, 2"
            className="font-mono"
          />
        </div>
      ) : (
        <div className="flex-1 w-full flex items-center gap-4 px-2">
          <Label className="whitespace-nowrap text-muted-foreground text-xs">Size: {size}</Label>
          <Slider 
            value={[size]} 
            min={2} 
            max={20} 
            step={1} 
            onValueChange={handleSizeChange}
            disabled={isLocked}
            className="flex-1"
          />
        </div>
      )}

    </div>
  );
}
