import { Algorithm, Step } from '@/lib/types';

export const selectionSort: Algorithm = {
  slug: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  description: 'Selection sort divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items.',
  timeComplexity: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}`
  },
  pseudocode: [
    "for i from 0 to N-1",
    "  minIndex = i",
    "  for j from i+1 to N",
    "    if arr[j] < arr[minIndex]",
    "      minIndex = j",
    "  if minIndex != i",
    "    swap(arr[i], arr[minIndex])"
  ],
  quiz: [
    {
      question: "Is Selection Sort stable?",
      options: ["Yes", "No", "Depends on array size", "Only if array is sorted"],
      correct: 1,
      explanation: "Selection Sort is generally not stable. Swapping an element from its original position can change the relative order of equal elements."
    },
    {
      question: "What is the primary advantage of Selection Sort?",
      options: ["Fast time complexity", "Requires very few swaps", "Stable sorting", "Easy to parallelize"],
      correct: 1,
      explanation: "Selection Sort makes O(n) swaps at most, making it useful when the cost of swapping items is very high."
    },
    {
      question: "What is the best case time complexity?",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
      correct: 2,
      explanation: "Selection sort always scans the entire remaining unsorted array to find the minimum, taking O(n^2) even if the array is already sorted."
    },
    {
      question: "How does it divide the array?",
      options: ["Evens and odds", "Sorted left part, unsorted right part", "Larger than pivot, smaller than pivot", "Trees and sub-trees"],
      correct: 1,
      explanation: "It maintains a sorted sublist at the beginning of the array, growing it by one element at each iteration."
    },
    {
      question: "Does Selection Sort adapt to the existing order in the array?",
      options: ["Yes", "No", "Partially", "Only on reverse sorted arrays"],
      correct: 1,
      explanation: "No, Selection Sort is not adaptive. It always performs the same number of comparisons regardless of the input data."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      steps.push({
        type: 'highlight',
        indices: [i],
        message: `Starting pass ${i + 1}. Assume ${arr[i]} at index ${i} is the minimum.`,
      });

      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'compare',
          indices: [j, minIndex],
          message: `Comparing current element ${arr[j]} with current minimum ${arr[minIndex]}.`,
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          steps.push({
            type: 'highlight',
            indices: [minIndex],
            message: `Found new minimum: ${arr[minIndex]} at index ${minIndex}.`,
          });
        }
      }

      if (minIndex !== i) {
        steps.push({
          type: 'swap',
          indices: [i, minIndex],
          message: `Pass complete. Swapping the minimum element ${arr[minIndex]} with the first unsorted element ${arr[i]}.`,
        });
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      } else {
        steps.push({
          type: 'highlight',
          indices: [i],
          message: `The minimum element is already in the correct position. No swap needed.`,
        });
      }

      steps.push({
        type: 'sorted',
        indices: [i],
        message: `${arr[i]} is now securely in its final sorted position.`,
      });
    }

    if (n > 0) {
      steps.push({
        type: 'sorted',
        indices: [n - 1],
        message: `The last element ${arr[n - 1]} is inherently in its correct sorted position.`,
      });
    }

    return steps;
  }
};
