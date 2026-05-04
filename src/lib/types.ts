export type Category = 
  | 'sorting' 
  | 'searching' 
  | 'graph' 
  | 'trees' 
  | 'data-structures' 
  | 'dp' 
  | 'greedy';

export type StepType =
  | 'compare' 
  | 'swap' 
  | 'set' 
  | 'highlight' 
  | 'sorted'
  | 'visit' 
  | 'enqueue' 
  | 'dequeue' 
  | 'push' 
  | 'pop'
  | 'dp-fill' 
  | 'dp-highlight' 
  | 'greedy-pick' 
  | 'greedy-reject';

export type Step = {
  type: StepType;
  indices?: number[];         // array elements involved
  values?: number[];          // their values at this step
  state?: number[];           // full array snapshot
  nodeIds?: string[];         // graph nodes involved
  edgeIds?: string[];         // graph edges involved
  dataStructureState?: any;   // any extra state (queue, stack, distances)
  message: string;            // plain English: "Comparing 8 and 3 — 8 > 3, so we swap"
  highlightLines?: number[];  // which code lines to highlight in Monaco
  metadata?: Record<string, unknown>;
};

export type GraphNode = {
  id: string;
  label: string;
  x?: number;
  y?: number;
  isStart?: boolean;
  isEnd?: boolean;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  weight?: number;
  isDirected?: boolean;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Algorithm = {
  slug: string;
  name: string;
  category: Category;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable?: boolean;
  inPlace?: boolean;
  code: { javascript: string; python: string; cpp: string };
  pseudocode: string[];
  quiz: QuizQuestion[];
  run: (input: number[], target?: number) => Step[];
};
