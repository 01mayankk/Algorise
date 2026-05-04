import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useVisualizationStore } from '@/store/visualizationStore';

export function useVisualization() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { isPlaying, speed, currentStep, steps, setIsPlaying, setCurrentStep } = useVisualizationStore();

  useEffect(() => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline({
        paused: true,
        onUpdate: () => {
          // Sync Zustand with GSAP timeline occasionally or rely on the timeline's progress
        },
        onComplete: () => {
          setIsPlaying(false);
          setCurrentStep(steps.length);
        }
      });
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [setIsPlaying, steps.length]);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(speed);
    }
  }, [speed]);

  useEffect(() => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.play();
      } else {
        timelineRef.current.pause();
      }
    }
  }, [isPlaying]);
  // Using a state or just returning the ref object so the component can access .current when needed
  // However, returning timelineRef.current is an anti-pattern. We'll return the ref itself.
  return { timelineRef };
}
