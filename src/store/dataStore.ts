import { create } from 'zustand';

import { GraphNode, GraphEdge } from '@/lib/types';

interface DataState {
  array: number[];
  setArray: (array: number[]) => void;
  searchTarget: number;
  setSearchTarget: (target: number) => void;
  nodes: GraphNode[];
  edges: GraphEdge[];
  setGraph: (nodes: GraphNode[], edges: GraphEdge[]) => void;
}

export const useDataStore = create<DataState>((set) => ({
  array: [8, 3, 5, 1, 9, 2],
  setArray: (array) => set({ array }),
  searchTarget: 9,
  setSearchTarget: (searchTarget) => set({ searchTarget }),
  nodes: [],
  edges: [],
  setGraph: (nodes, edges) => set({ nodes, edges }),
}));
