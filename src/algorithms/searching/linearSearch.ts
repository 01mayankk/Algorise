import { Algorithm, Step } from '@/lib/types';

export const linearSearch: Algorithm = {
  slug: 'linear-search',
  name: 'Linear Search',
  category: 'searching',
  description: 'Linear search is the simplest search algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.',
  timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  code: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cpp: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`
  },
  pseudocode: [
    "function linearSearch(arr, target)",
    "  for i from 0 to length(arr) - 1",
    "    if arr[i] == target",
    "      return i",
    "  return -1"
  ],
  quiz: [
    {
      question: "What is the best case scenario for Linear Search?",
      options: ["The target is at the end of the array", "The target is the first element", "The target is not in the array", "The array is already sorted"],
      correct: 1,
      explanation: "If the target is the very first element checked, the algorithm terminates immediately in O(1) time."
    },
    {
      question: "Does Linear Search require the array to be sorted?",
      options: ["Yes", "No", "Only for integers", "Only for strings"],
      correct: 1,
      explanation: "Linear search checks every element sequentially, so it works perfectly fine on unsorted data."
    },
    {
      question: "What is the worst case time complexity?",
      options: ["O(log n)", "O(1)", "O(n)", "O(n^2)"],
      correct: 2,
      explanation: "In the worst case (the target is at the very end or not in the array at all), it must check every single element, taking O(n) time."
    },
    {
      question: "When is Linear Search preferred over Binary Search?",
      options: ["When the array is large and sorted", "When the array is small or unsorted", "When memory is unlimited", "Always"],
      correct: 1,
      explanation: "For small arrays, the overhead of sorting or binary search makes linear search faster. For unsorted arrays, sorting takes O(n log n), making a single O(n) linear search much more efficient."
    },
    {
      question: "Can Linear Search be used on linked lists?",
      options: ["Yes", "No", "Only doubly linked lists", "Only circular linked lists"],
      correct: 0,
      explanation: "Yes, Linear Search works natively on linked lists since it only requires sequential access (iterating node by node)."
    }
  ],
  run: (input: number[], target?: number): Step[] => {
    const steps: Step[] = [];
    const searchVal = target ?? 9; // Default to 9 if undefined
    
    for (let i = 0; i < input.length; i++) {
      steps.push({
        type: 'highlight',
        indices: [i],
        message: `Checking index ${i}. Is ${input[i]} == ${searchVal}?`,
      });

      if (input[i] === searchVal) {
        steps.push({
          type: 'sorted', // Re-using sorted to indicate found/success visually
          indices: [i],
          message: `Target ${searchVal} found at index ${i}!`,
        });
        return steps;
      }
    }

    steps.push({
      type: 'compare', // Neutral final step
      indices: [],
      message: `Target ${searchVal} was not found in the array.`,
    });

    return steps;
  }
};
