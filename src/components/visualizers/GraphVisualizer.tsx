"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { gsap } from 'gsap';
import { useDataStore } from '@/store/dataStore';
import { useVisualizationStore } from '@/store/visualizationStore';
import { useTheme } from 'next-themes';
import { GraphNode } from '@/lib/types';

const COLORS = {
  defaultNode: '#334155', 
  defaultNodeDark: '#e2e8f0',
  defaultEdge: '#cbd5e1',
  defaultEdgeDark: '#475569',
  visit: '#3b82f6', // blue
  highlight: '#f59e0b', // amber
  path: '#22c55e', // green
};

export function GraphVisualizer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { nodes, edges } = useDataStore();
  const { currentStep, steps, isPlaying, speed, setCurrentStep, setIsPlaying } = useVisualizationStore();
  const { theme } = useTheme();
  
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const isDark = theme === 'dark';
  const NODE_COLOR = isDark ? COLORS.defaultNodeDark : COLORS.defaultNode;
  const EDGE_COLOR = isDark ? COLORS.defaultEdgeDark : COLORS.defaultEdge;
  const TEXT_COLOR = isDark ? '#f8fafc' : '#0f172a';

  const nodeMap = new Map<string, GraphNode>();
  nodes.forEach(n => nodeMap.set(n.id, n));

  // Initialize D3 Zoom
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (e) => setTransform(e.transform));
    svg.call(zoom);
  }, [nodes]); // Re-bind zoom if nodes change heavily, but normally runs once

  // Build GSAP Timeline from Steps
  useEffect(() => {
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
      onComplete: () => {
        setIsPlaying(false);
        setCurrentStep(steps.length);
      }
    });

    const tl = timelineRef.current;
    const baseDuration = 0.5;

    // Reset all elements to default before starting
    gsap.set('.node-circle', { fill: NODE_COLOR });
    gsap.set('.edge-path', { stroke: EDGE_COLOR });

    steps.forEach((step, stepIndex) => {
      tl.addLabel(`step-${stepIndex}`);
      tl.call(() => setCurrentStep(stepIndex), [], `<`);

      const targets: string[] = [];
      if (step.nodeIds) {
        step.nodeIds.forEach(id => targets.push(`#node-${id} .node-circle`));
      }
      if (step.edgeIds) {
        step.edgeIds.forEach(id => targets.push(`#edge-${id} .edge-path`));
      }

      if (targets.length > 0) {
        let color = COLORS.highlight;
        if (step.type === 'visit') color = COLORS.visit;
        if (step.type === 'sorted' || step.type === 'dp-fill') color = COLORS.path; // Reusing for final path

        tl.to(targets, { 
          fill: (i, el) => el.classList.contains('node-circle') ? color : undefined,
          stroke: (i, el) => el.classList.contains('edge-path') ? color : undefined,
          duration: baseDuration * 0.4 
        }, `<`);

        // Revert to default unless it's a permanent visit/path
        if (step.type === 'highlight' || step.type === 'compare') {
          tl.to(targets, { 
            fill: (i, el) => el.classList.contains('node-circle') ? NODE_COLOR : undefined,
            stroke: (i, el) => el.classList.contains('edge-path') ? EDGE_COLOR : undefined,
            duration: baseDuration * 0.4 
          }, `>+${baseDuration * 0.2}`);
        }
      } else {
        // Dummy animation to maintain step duration
        tl.to({}, { duration: baseDuration }, `<`);
      }
    });

  }, [steps, NODE_COLOR, EDGE_COLOR, setCurrentStep, setIsPlaying]);

  // Handle Play/Pause & Speed
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

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-video md:aspect-[21/9] bg-background/50 rounded-2xl border shadow-sm overflow-hidden relative cursor-grab active:cursor-grabbing"
    >
      <svg ref={svgRef} className="w-full h-full">
        <g transform={transform.toString()}>
          {edges.map((edge) => {
            const source = nodeMap.get(edge.source);
            const target = nodeMap.get(edge.target);
            if (!source || !target) return null;
            return (
              <g key={edge.id} id={`edge-${edge.id}`}>
                <line
                  x1={source.x || 0}
                  y1={source.y || 0}
                  x2={target.x || 0}
                  y2={target.y || 0}
                  stroke={EDGE_COLOR}
                  strokeWidth={edge.weight !== undefined ? 4 : 2}
                  className="edge-path transition-all duration-200"
                />
                {edge.weight !== undefined && (
                  <text
                    x={((source.x || 0) + (target.x || 0)) / 2}
                    y={((source.y || 0) + (target.y || 0)) / 2 - 8}
                    fill={TEXT_COLOR}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}
          {nodes.map((node) => (
            <g key={node.id} id={`node-${node.id}`} transform={`translate(${node.x || 0}, ${node.y || 0})`}>
              <circle
                r={24}
                fill={NODE_COLOR}
                stroke={isDark ? '#64748b' : '#94a3b8'}
                strokeWidth={2}
                className="node-circle transition-all duration-200"
              />
              <text
                dy="0.3em"
                fill={TEXT_COLOR}
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-muted-foreground text-sm font-medium">
            Select a graph from the input controls to begin.
          </p>
        </div>
      )}
    </div>
  );
}
