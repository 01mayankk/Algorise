import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { countingSort } from './countingSort';
import { radixSort } from './radixSort';
import { bucketSort } from './bucketSort';
import { shellSort } from './shellSort';
import { timSort } from './timSort';
import { combSort } from './combSort';
import { cycleSort } from './cycleSort';
import { bitonicSort } from './bitonicSort';
import { treeSort } from './treeSort';

export const sortingAlgorithms = [
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  countingSort,
  radixSort,
  bucketSort,
  shellSort,
  timSort,
  combSort,
  cycleSort,
  bitonicSort,
  treeSort,
];

// For quick lookup
export const sortingAlgorithmsMap = Object.fromEntries(
  sortingAlgorithms.map((algo) => [algo.slug, algo])
);
