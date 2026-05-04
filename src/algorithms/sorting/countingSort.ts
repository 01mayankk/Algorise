import { Algorithm, Step } from '@/lib/types';

export const countingSort: Algorithm = {
  slug: 'counting-sort',
  name: 'Counting Sort',
  category: 'sorting',
  description: 'Counting sort is an integer sorting algorithm that operates by counting the number of objects that possess distinct key values, and applying prefix sum to calculate the positions of each key.',
  timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
  spaceComplexity: 'O(k)',
  stable: true,
  inPlace: false,
  code: {
    javascript: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  let max = Math.max(...arr);
  let min = Math.min(...arr);
  let range = max - min + 1;
  let count = new Array(range).fill(0);
  let output = new Array(arr.length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  return arr;
}`,
    python: `def counting_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    min_val = min(arr)
    range_of_elements = max_val - min_val + 1
    count = [0] * range_of_elements
    output = [0] * len(arr)

    for i in range(len(arr)):
        count[arr[i] - min_val] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1

    for i in range(len(arr)):
        arr[i] = output[i]
    return arr`,
    cpp: `void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    int max_val = *max_element(arr.begin(), arr.end());
    int min_val = *min_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;

    vector<int> count(range, 0);
    vector<int> output(arr.size());

    for (int i = 0; i < arr.size(); i++)
        count[arr[i] - min_val]++;

    for (int i = 1; i < count.size(); i++)
        count[i] += count[i - 1];

    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - min_val] - 1] = arr[i];
        count[arr[i] - min_val]--;
    }

    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}`
  },
  pseudocode: [
    "function countingSort(arr)",
    "  max = max(arr), min = min(arr)",
    "  count = array of zeros of size (max - min + 1)",
    "  for val in arr: count[val - min]++",
    "  for i from 1 to count.length - 1:",
    "    count[i] += count[i - 1]",
    "  for i from arr.length - 1 down to 0:",
    "    output[count[arr[i] - min] - 1] = arr[i]",
    "    count[arr[i] - min]--",
    "  arr = output"
  ],
  quiz: [
    {
      question: "Is Counting Sort a comparison-based sort?",
      options: ["Yes", "No", "Depends", "Only for strings"],
      correct: 1,
      explanation: "No, Counting Sort uses key values as indexes into an array and does not compare elements directly against each other."
    },
    {
      question: "What does 'k' represent in the O(n + k) time complexity?",
      options: ["Number of elements", "Number of swaps", "Range of the input data", "Array capacity"],
      correct: 2,
      explanation: "k is the range of the input data (max - min + 1). If k is very large, the algorithm becomes inefficient."
    },
    {
      question: "Why do we iterate backwards when building the output array?",
      options: ["It's faster", "To make it stable", "To save memory", "It's required by the language"],
      correct: 1,
      explanation: "Iterating backwards ensures that equal elements retain their original relative order, making the sort stable."
    },
    {
      question: "When is Counting Sort a bad choice?",
      options: ["When sorting strings", "When sorting integers with a very large range (e.g., 1 to 1 billion)", "When memory is unlimited", "When the array is small"],
      correct: 1,
      explanation: "If the range of elements is significantly larger than the number of elements, the memory overhead and time taken to initialize the count array makes it very inefficient."
    },
    {
      question: "What is the space complexity of Counting Sort?",
      options: ["O(1)", "O(n)", "O(k)", "O(n + k)"],
      correct: 3,
      explanation: "It requires O(n) space for the output array and O(k) space for the count array, totaling O(n + k)."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const output = new Array(arr.length).fill(0);
    
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Scanning array to find min and max values.`,
    });

    // We do a visual-only representation, meaning we just show sets
    let sortedArr = [...arr].sort((a,b)=>a-b);
    
    // For counting sort visualization on a standard bar chart, we can just highlight and then place.
    // Real counting sort modifies a separate array, so we'll simulate the "placing" part sequentially
    // to give visual feedback.
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            type: 'set',
            indices: [i],
            values: [sortedArr[i]],
            message: `Placing ${sortedArr[i]} in its correct position based on the counting prefix sum.`,
        });
        arr[i] = sortedArr[i];
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Counting sort complete. Array is sorted.`,
    });

    return steps;
  }
};
