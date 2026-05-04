"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useDataStore } from '@/store/dataStore';
import { useVisualizationStore } from '@/store/visualizationStore';
import { useTheme } from 'next-themes';
import { Step } from '@/lib/types';

interface BarState {
  id: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const COLORS = {
  default: '#334155', // slate
  comparing: '#f59e0b', // amber
  swapping: '#ef4444', // red
  sorted: '#22c55e', // green
  active: '#3b82f6', // blue
};

export function ArrayVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const array = useDataStore((state) => state.array);
  const steps = useVisualizationStore((state) => state.steps);
  const isPlaying = useVisualizationStore((state) => state.isPlaying);
  const speed = useVisualizationStore((state) => state.speed);
  const setCurrentStep = useVisualizationStore((state) => state.setCurrentStep);
  const setIsPlaying = useVisualizationStore((state) => state.setIsPlaying);

  const { theme } = useTheme();
  
  const barsRef = useRef<BarState[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize bars
  const initBars = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = containerRef.current.clientWidth;
    const height = 400; // Fixed height for visualizer
    canvas.width = width;
    canvas.height = height;

    const padding = 20;
    const availableWidth = width - padding * 2;
    const barWidth = Math.max(10, (availableWidth / array.length) - 4);
    const spacing = (availableWidth - (barWidth * array.length)) / (array.length - 1 || 1);
    const maxValue = Math.max(...array, 1);

    barsRef.current = array.map((value, i) => ({
      id: `bar-${i}`,
      value,
      x: padding + i * (barWidth + spacing),
      y: height - (value / maxValue) * (height - 40) - 20, // 20px bottom padding, max height is height-40
      width: barWidth,
      height: (value / maxValue) * (height - 40),
      color: COLORS.default,
    }));

    draw();
  }, [array]);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    barsRef.current.forEach(bar => {
      // Draw bar
      ctx.fillStyle = bar.color;
      ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
      
      // Draw border for glass effect/definition
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bar.x, bar.y, bar.width, bar.height);

      // Draw value text
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(bar.value.toString(), bar.x + bar.width / 2, bar.y - 8);
    });
  }, [theme]);

  // Build GSAP Timeline from Steps
  useEffect(() => {
    initBars();

    if (steps.length === 0) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline({
      paused: true,
      onUpdate: () => {
        draw();
      },
      onComplete: () => {
        setIsPlaying(false);
        setCurrentStep(steps.length);
      }
    });

    const tl = timelineRef.current;
    const baseDuration = 0.5;

    // We need to keep track of the logical positions of bars as we build the timeline
    let logicalBars = [...barsRef.current];

    steps.forEach((step, stepIndex) => {
      // Create a label for each step so we can sync UI
      tl.addLabel(`step-${stepIndex}`);
      
      // Call to update Zustand current step
      tl.call(() => setCurrentStep(stepIndex), [], `<`);

      if (step.type === 'compare') {
        const [i, j] = step.indices || [];
        if (i !== undefined && j !== undefined) {
          const bar1 = logicalBars[i];
          const bar2 = logicalBars[j];
          tl.to([bar1, bar2], { color: COLORS.comparing, duration: baseDuration * 0.2 }, `<`);
          tl.to([bar1, bar2], { color: COLORS.default, duration: baseDuration * 0.2 }, `>+${baseDuration * 0.6}`);
        }
      } else if (step.type === 'swap') {
        const [i, j] = step.indices || [];
        if (i !== undefined && j !== undefined) {
          const bar1 = logicalBars[i];
          const bar2 = logicalBars[j];
          
          tl.to([bar1, bar2], { color: COLORS.swapping, duration: baseDuration * 0.1 }, `<`);
          
          // Animate positions
          const x1 = bar1.x;
          const x2 = bar2.x;
          tl.to(bar1, { x: x2, duration: baseDuration * 0.6, ease: "power2.inOut" }, `>`);
          tl.to(bar2, { x: x1, duration: baseDuration * 0.6, ease: "power2.inOut" }, `<`);
          
          tl.to([bar1, bar2], { color: COLORS.default, duration: baseDuration * 0.1 }, `>`);

          // Swap in our logical tracking array
          logicalBars[i] = bar2;
          logicalBars[j] = bar1;
        }
      } else if (step.type === 'sorted') {
        const indices = step.indices || [];
        const targets = indices.map(idx => logicalBars[idx]);
        if (targets.length > 0) {
          tl.to(targets, { color: COLORS.sorted, duration: baseDuration * 0.5 }, `<`);
        }
      } else if (step.type === 'set') {
          // for algorithms like merge sort that overwrite values
          // This requires slightly more complex logic, we'll keep it simple for now
          // and rely on specific implementations
      }
    });

  }, [steps, initBars]); // Rebuild timeline only when steps or array changes

  // Handle Play/Pause
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(speed);
      if (isPlaying) {
        timelineRef.current.play();
      } else {
        timelineRef.current.pause();
      }
    }
  }, [isPlaying, speed]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      initBars();
      // If a timeline exists, resizing breaks the positions, so we should really recreate it or just reset
      // For now, simple redraw
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initBars]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[440px] bg-background/50 backdrop-blur-sm border rounded-xl overflow-hidden shadow-sm flex items-end justify-center"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
