import { Algorithm, Step } from '@/lib/types';

export const binarySearch: Algorithm = {
  slug: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  description: 'Binary Search is a fast search algorithm with run-time complexity of O(log n). This search algorithm works on the principle of divide and conquer. For this algorithm to work properly, the data collection should be in a sorted form.',
  timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(1)',
  code: {
    javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);

    if (arr[mid] === target)
      return mid;
    
    if (arr[mid] < target)
      low = mid + 1;
    else
      high = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1`,
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;

        if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}`
  },
  pseudocode: [
    "function binarySearch(arr, target)",
    "  low = 0, high = length(arr) - 1",
    "  while low <= high",
    "    mid = floor((low + high) / 2)",
    "    if arr[mid] == target",
    "      return mid",
    "    else if arr[mid] < target",
    "      low = mid + 1",
    "    else",
    "      high = mid - 1",
    "  return -1"
  ],
  quiz: [
    {
      question: "What is the absolute prerequisite for Binary Search?",
      options: ["The array must be empty", "The array must contain only positive integers", "The array must be sorted", "The array must have an even number of elements"],
      correct: 2,
      explanation: "Binary search uses the sorted nature of the array to eliminate half of the remaining search space on every iteration."
    },
    {
      question: "Why is mid calculated as `low + (high - low) / 2` instead of `(low + high) / 2`?",
      options: ["It is faster to execute", "To prevent integer overflow", "It works better with floats", "It's just a style preference"],
      correct: 1,
      explanation: "If low and high are very large, `low + high` can exceed the maximum integer limit of the language, causing an overflow. `low + (high - low) / 2` avoids this."
    },
    {
      question: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
      correct: 2,
      explanation: "Because the search space is halved every iteration, it takes at most log2(n) steps to find the target or determine it isn't there."
    },
    {
      question: "Can Binary Search be implemented recursively?",
      options: ["Yes, taking O(log n) auxiliary space", "Yes, taking O(1) auxiliary space", "No, it must be iterative", "Only in Python"],
      correct: 0,
      explanation: "Yes, it can be implemented recursively. However, the recursive call stack will take O(log n) auxiliary space, whereas the iterative version takes O(1)."
    },
    {
      question: "If an array has 1,000,000 elements, roughly what is the maximum number of comparisons Binary Search will make?",
      options: ["1,000,000", "500,000", "20", "100"],
      correct: 2,
      explanation: "log2(1,000,000) is approximately 20. It will take at most 20 comparisons to find any element!"
    }
  ],
  run: (input: number[], target?: number): Step[] => {
    const steps: Step[] = [];
    const searchVal = target ?? 9;

    let arr = [...input];
    let isSorted = true;
    for(let i=0; i<arr.length-1; i++){
        if(arr[i] > arr[i+1]) {
            isSorted = false;
            break;
        }
    }

    if (!isSorted) {
       steps.push({
          type: 'highlight',
          indices: Array.from({length: arr.length}, (_, i) => i),
          message: `Binary Search requires a sorted array. Sorting array first...`,
       });
       arr.sort((a,b)=>a-b);
       
       for(let i=0; i<arr.length; i++) {
           steps.push({
               type: 'set',
               indices: [i],
               values: [arr[i]],
               message: `Sorting...`
           });
       }
    }

    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);

      steps.push({
        type: 'highlight',
        indices: Array.from({length: high - low + 1}, (_, i) => low + i),
        message: `Current search space is from index ${low} to ${high}.`,
      });

      steps.push({
        type: 'compare',
        indices: [mid],
        message: `Checking midpoint at index ${mid}. Is ${arr[mid]} == ${searchVal}?`,
      });

      if (arr[mid] === searchVal) {
        steps.push({
          type: 'sorted', 
          indices: [mid],
          message: `Target ${searchVal} found at index ${mid}!`,
        });
        return steps;
      }

      if (arr[mid] < searchVal) {
        steps.push({
          type: 'compare',
          indices: [mid],
          message: `${arr[mid]} < ${searchVal}, so we discard the left half.`,
        });
        low = mid + 1;
      } else {
        steps.push({
          type: 'compare',
          indices: [mid],
          message: `${arr[mid]} > ${searchVal}, so we discard the right half.`,
        });
        high = mid - 1;
      }
    }

    steps.push({
      type: 'compare',
      indices: [],
      message: `Search space exhausted. Target ${searchVal} was not found.`,
    });

    return steps;
  }
};
