import { Algorithm, Step } from '@/lib/types';

export const insertionSort: Algorithm = {
  slug: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  description: 'Insertion sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
  timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  stable: true,
  inPlace: true,
  code: {
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
  },
  pseudocode: [
    "for i from 1 to N-1",
    "  key = arr[i]",
    "  j = i - 1",
    "  while j >= 0 and arr[j] > key",
    "    arr[j+1] = arr[j]",
    "    j = j - 1",
    "  arr[j+1] = key"
  ],
  quiz: [
    {
      question: "What is the best case time complexity of Insertion Sort?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"],
      correct: 1,
      explanation: "If the array is already sorted, the inner while loop breaks immediately, resulting in O(n) total comparisons and no shifting."
    },
    {
      question: "Is Insertion Sort stable?",
      options: ["Yes", "No", "Sometimes", "Only for integers"],
      correct: 0,
      explanation: "Insertion Sort is stable because it only shifts an element if it is strictly greater than the key, preserving original order of equal elements."
    },
    {
      question: "When is Insertion Sort typically used?",
      options: ["For massive datasets", "For nearly sorted or very small arrays", "To sort linked lists in O(n log n)", "As a primary distributed sort"],
      correct: 1,
      explanation: "Insertion sort is highly efficient on small arrays and nearly sorted arrays. It's often used as the base case for Quick Sort or Merge Sort."
    },
    {
      question: "What real-world action is Insertion Sort analogous to?",
      options: ["Sorting a hand of playing cards", "Searching a dictionary", "Organizing a tournament bracket", "Packing a suitcase"],
      correct: 0,
      explanation: "When you pick up a new card and insert it into the correct position among the already sorted cards in your hand, you are doing insertion sort."
    },
    {
      question: "Does Insertion Sort swap elements?",
      options: ["Yes, always", "No, it shifts them", "Only if they are equal", "Only for the first element"],
      correct: 1,
      explanation: "Technically, insertion sort shifts elements one position to the right to make room, rather than doing a full swap of two elements."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const n = arr.length;

    if (n > 0) {
      steps.push({
        type: 'sorted',
        indices: [0],
        message: `The first element ${arr[0]} is trivially sorted.`,
      });
    }

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      steps.push({
        type: 'highlight',
        indices: [i],
        message: `Picking the next element ${key} to insert into the sorted portion.`,
      });

      while (j >= 0) {
        steps.push({
          type: 'compare',
          indices: [j, j + 1], // Comparing the visual elements
          message: `Comparing ${arr[j]} with ${key}.`,
        });

        if (arr[j] > key) {
          steps.push({
            type: 'swap', // visually represent shift as a swap with the adjacent element
            indices: [j, j + 1],
            message: `${arr[j]} is greater than ${key}, shifting ${arr[j]} to the right.`,
          });
          arr[j + 1] = arr[j];
          arr[j] = key; // Keep key tracking visually accurate through swaps
          j = j - 1;
        } else {
          steps.push({
            type: 'highlight',
            indices: [j + 1],
            message: `${arr[j]} is not greater than ${key}. We found the insertion point.`,
          });
          break;
        }
      }
      
      // Mark elements up to i as sorted
      steps.push({
        type: 'sorted',
        indices: Array.from({ length: i + 1 }, (_, k) => k),
        message: `The subarray up to index ${i} is now sorted.`,
      });
    }

    return steps;
  }
};
