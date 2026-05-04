"use client";

import React from 'react';
import { Algorithm } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Clock, HardDrive, CheckCircle2, XCircle } from 'lucide-react';

interface ComplexityBadgeProps {
  algorithm: Algorithm;
}

export function ComplexityBadge({ algorithm }: ComplexityBadgeProps) {
  
  const getComplexityColor = (comp: string) => {
    if (comp.includes('1') || comp.includes('log n')) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (comp.includes('n log n')) return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    if (comp === 'O(n)') return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    if (comp.includes('n^2') || comp.includes('n^3')) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    if (comp.includes('2^n') || comp.includes('n!')) return 'text-red-500 bg-red-500/10 border-red-500/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  return (
    <div className="w-full p-4 bg-background/80 backdrop-blur border rounded-xl shadow-sm flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Complexity</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" /> Best
          </div>
          <div className={cn("px-2 py-1 rounded-md text-sm font-mono font-medium border inline-block w-full text-center", getComplexityColor(algorithm.timeComplexity.best))}>
            {algorithm.timeComplexity.best}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" /> Average
          </div>
          <div className={cn("px-2 py-1 rounded-md text-sm font-mono font-medium border inline-block w-full text-center", getComplexityColor(algorithm.timeComplexity.average))}>
            {algorithm.timeComplexity.average}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" /> Worst
          </div>
          <div className={cn("px-2 py-1 rounded-md text-sm font-mono font-medium border inline-block w-full text-center", getComplexityColor(algorithm.timeComplexity.worst))}>
            {algorithm.timeComplexity.worst}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HardDrive className="w-3.5 h-3.5" /> Space
          </div>
          <div className={cn("px-2 py-1 rounded-md text-sm font-mono font-medium border inline-block w-full text-center", getComplexityColor(algorithm.spaceComplexity))}>
            {algorithm.spaceComplexity}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-2 border-t mt-2">
        {algorithm.stable !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Stable:</span>
            {algorithm.stable ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        )}
        {algorithm.inPlace !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">In-Place:</span>
            {algorithm.inPlace ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
