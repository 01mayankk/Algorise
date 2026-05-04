"use client";

import React from 'react';
import { useDataStore } from '@/store/dataStore';
import { useVisualizationStore } from '@/store/visualizationStore';
import { Button } from '@/components/ui/button';
import { Network, TreePine, Grid, Shuffle } from 'lucide-react';
import { GraphNode, GraphEdge } from '@/lib/types';

export function GraphInput() {
  const { setGraph } = useDataStore();
  const { isPlaying, steps } = useVisualizationStore();
  const isLocked = isPlaying || steps.length > 0;

  const generateBinaryTree = () => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    
    // Simple 3-level binary tree
    const positions = [
      { id: '1', label: '1', x: 300, y: 50 },
      { id: '2', label: '2', x: 150, y: 150 },
      { id: '3', label: '3', x: 450, y: 150 },
      { id: '4', label: '4', x: 75, y: 250 },
      { id: '5', label: '5', x: 225, y: 250 },
      { id: '6', label: '6', x: 375, y: 250 },
      { id: '7', label: '7', x: 525, y: 250 },
    ];
    
    positions.forEach(p => nodes.push(p));
    
    edges.push({ id: '1-2', source: '1', target: '2' });
    edges.push({ id: '1-3', source: '1', target: '3' });
    edges.push({ id: '2-4', source: '2', target: '4' });
    edges.push({ id: '2-5', source: '2', target: '5' });
    edges.push({ id: '3-6', source: '3', target: '6' });
    edges.push({ id: '3-7', source: '3', target: '7' });
    
    setGraph(nodes, edges);
  };

  const generateRandomGraph = () => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const numNodes = 6;
    
    // Circular layout
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * 2 * Math.PI - Math.PI / 2;
      const radius = 120;
      nodes.push({
        id: String.fromCharCode(65 + i), // A, B, C...
        label: String.fromCharCode(65 + i),
        x: 300 + Math.cos(angle) * radius,
        y: 180 + Math.sin(angle) * radius,
      });
    }

    // Connect them randomly
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() > 0.5) {
          edges.push({
            id: `${nodes[i].id}-${nodes[j].id}`,
            source: nodes[i].id,
            target: nodes[j].id,
            weight: Math.floor(Math.random() * 10) + 1
          });
        }
      }
    }

    // Guarantee it's connected (simple path A->B->C...)
    for (let i = 0; i < numNodes - 1; i++) {
      const id = `${nodes[i].id}-${nodes[i+1].id}`;
      if (!edges.find(e => e.id === id && e.source === nodes[i].id && e.target === nodes[i+1].id)) {
         edges.push({ id, source: nodes[i].id, target: nodes[i+1].id, weight: 1 });
      }
    }

    setGraph(nodes, edges);
  };

  const generateGridGraph = () => {
     const nodes: GraphNode[] = [];
     const edges: GraphEdge[] = [];
     
     for (let row = 0; row < 3; row++) {
       for (let col = 0; col < 3; col++) {
         const id = `${row}-${col}`;
         nodes.push({
           id,
           label: `${row},${col}`,
           x: 150 + col * 120,
           y: 60 + row * 100,
         });
         
         if (col > 0) {
           edges.push({ id: `${row}-${col-1}-to-${row}-${col}`, source: `${row}-${col-1}`, target: id, weight: 1 });
         }
         if (row > 0) {
           edges.push({ id: `${row-1}-${col}-to-${row}-${col}`, source: `${row-1}-${col}`, target: id, weight: 1 });
         }
       }
     }
     setGraph(nodes, edges);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-background/80 backdrop-blur px-2 py-2 rounded-xl border shadow-sm">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={generateBinaryTree} 
        disabled={isLocked}
        className="gap-2"
      >
        <TreePine className="w-4 h-4" />
        Binary Tree
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={generateRandomGraph} 
        disabled={isLocked}
        className="gap-2"
      >
        <Shuffle className="w-4 h-4" />
        Random
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={generateGridGraph} 
        disabled={isLocked}
        className="gap-2"
      >
        <Grid className="w-4 h-4" />
        Grid
      </Button>
    </div>
  );
}
