import { Algorithm, Step } from '@/lib/types';

export const bubbleSort: Algorithm = {
  slug: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  description: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.',
  timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  stable: true,
  inPlace: true,
  code: {
    javascript: `function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
  },
  pseudocode: [
    "for i from 0 to N-1",
    "  swapped = false",
    "  for j from 0 to N-i-1",
    "    if arr[j] > arr[j+1]",
    "      swap(arr[j], arr[j+1])",
    "      swapped = true",
    "  if not swapped break"
  ],
  quiz: [
    {
      question: "What is the best case time complexity of Bubble Sort?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(1)"],
      correct: 2,
      explanation: "If the array is already sorted, Bubble Sort makes one pass without any swaps, breaking out early, resulting in O(n) time complexity."
    },
    {
      question: "Is Bubble Sort a stable algorithm?",
      options: ["Yes", "No", "Depends on implementation", "Only for small arrays"],
      correct: 0,
      explanation: "Bubble Sort only swaps elements if they are strictly greater, preserving the relative order of equal elements."
    },
    {
      question: "When is Bubble Sort a good choice?",
      options: ["For large datasets", "When memory is severely limited and array is almost sorted", "When recursion is needed", "For linked lists"],
      correct: 1,
      explanation: "Bubble Sort is in-place and performs well O(n) on nearly sorted data, though Insertion Sort is generally preferred."
    },
    {
      question: "How many passes does Bubble Sort take for a completely reverse sorted array of size N?",
      options: ["N", "N-1", "N/2", "log N"],
      correct: 1,
      explanation: "In the worst case, the smallest element is at the very end and moves one step left per pass. It takes N-1 passes to sort."
    },
    {
      question: "What optimization is standard for Bubble Sort?",
      options: ["Using a pivot", "Skipping the last sorted elements and using a swapped flag", "Dividing into halves", "Using a hash table"],
      correct: 1,
      explanation: "Using a boolean flag to check if any swaps occurred allows the algorithm to terminate early if the array is already sorted."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          type: 'compare',
          indices: [j, j + 1],
          message: `Comparing ${arr[j]} and ${arr[j+1]}.`,
        });

        if (arr[j] > arr[j + 1]) {
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
            message: `${arr[j]} is greater than ${arr[j+1]}, so we swap them.`,
          });
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        } else {
          steps.push({
            type: 'compare',
            indices: [j, j + 1],
            message: `${arr[j]} is not greater than ${arr[j+1]}, no swap needed.`,
          });
        }
      }
      
      // The element at n-i-1 is now in its correct sorted position
      steps.push({
        type: 'sorted',
        indices: [n - i - 1],
        message: `${arr[n - i - 1]} is now in its final sorted position.`,
      });

      if (!swapped) {
        steps.push({
          type: 'sorted',
          indices: Array.from({ length: n - i - 1 }, (_, k) => k),
          message: `No swaps occurred in this pass, meaning the array is completely sorted.`,
        });
        break;
      }
    }
    
    if (n > 0 && swapped) {
       steps.push({
          type: 'sorted',
          indices: [0],
          message: `${arr[0]} is the last remaining element and is in its correct position.`,
        });
    }

    return steps;
  }
};
