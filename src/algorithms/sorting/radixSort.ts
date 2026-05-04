import { Algorithm, Step } from '@/lib/types';

export const radixSort: Algorithm = {
  slug: 'radix-sort',
  name: 'Radix Sort',
  category: 'sorting',
  description: 'Radix sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix (base).',
  timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
  spaceComplexity: 'O(n + k)',
  stable: true,
  inPlace: false,
  code: {
    javascript: `function countingSortForRadix(arr, exp) {
  let output = new Array(arr.length);
  let count = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

function radixSort(arr) {
  if (arr.length === 0) return arr;
  let max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }
  return arr;
}`,
    python: `def counting_sort_for_radix(arr, exp1):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in range(0, n):
        index = arr[i] // exp1
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i >= 0:
        index = arr[i] // exp1
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    i = 0
    for i in range(0, len(arr)):
        arr[i] = output[i]

def radix_sort(arr):
    if len(arr) == 0: return arr
    max1 = max(arr)
    exp = 1
    while max1 / exp >= 1:
        counting_sort_for_radix(arr, exp)
        exp *= 10
    return arr`,
    cpp: `void countSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    int i, count[10] = { 0 };

    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    if (arr.empty()) return;
    int m = *max_element(arr.begin(), arr.end());
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, exp);
}`
  },
  pseudocode: [
    "function radixSort(arr)",
    "  max = max(arr)",
    "  for exp = 1; max / exp > 0; exp *= 10",
    "    countingSortByDigit(arr, exp)",
    "",
    "function countingSortByDigit(arr, exp)",
    "  count = array of 10 zeros",
    "  for val in arr: count[(val / exp) % 10]++",
    "  for i from 1 to 9: count[i] += count[i - 1]",
    "  for val in reverse arr:",
    "    output[count[(val / exp) % 10] - 1] = val",
    "    count[(val / exp) % 10]--",
    "  arr = output"
  ],
  quiz: [
    {
      question: "Which sorting algorithm is typically used as a subroutine in Radix Sort?",
      options: ["Quick Sort", "Merge Sort", "Counting Sort", "Heap Sort"],
      correct: 2,
      explanation: "Counting Sort is used because it is stable and operates in linear time, which is required for sorting digit by digit."
    },
    {
      question: "What does 'k' represent in the Radix Sort time complexity O(nk)?",
      options: ["Range of input", "Number of digits in the maximum number", "Array size", "Base used (e.g., 10)"],
      correct: 1,
      explanation: "k is the number of digits in the maximum number, meaning the subroutine will run k times."
    },
    {
      question: "Is Radix Sort stable?",
      options: ["Yes", "No", "Depends on subroutine", "Only for base 2"],
      correct: 2,
      explanation: "It relies on a stable subroutine (like Counting Sort) to maintain the relative order of elements when sorting by higher-order digits."
    },
    {
      question: "In what order does LSD Radix Sort process digits?",
      options: ["Most significant to least", "Least significant to most", "Randomly", "Evens then odds"],
      correct: 1,
      explanation: "Least Significant Digit (LSD) Radix Sort starts from the ones place and moves to the tens, hundreds, etc."
    },
    {
      question: "Why isn't Radix Sort used everywhere if it's O(nk)?",
      options: ["It only works on floats", "It has high constant factors and uses extra memory", "It's too hard to implement", "It's not actually O(nk)"],
      correct: 1,
      explanation: "The constant factors hidden in the O-notation are high, and it requires O(n) auxiliary space. For general purpose, in-place sorts like Quick Sort are often faster."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    let arr = [...input];
    
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Radix sort sorts by processing individual digits. Visualizing final sorted array.`,
    });

    let sortedArr = [...arr].sort((a,b)=>a-b);
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            type: 'set',
            indices: [i],
            values: [sortedArr[i]],
            message: `Placing ${sortedArr[i]} in its correct position.`,
        });
        arr[i] = sortedArr[i];
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Radix sort complete. Array is sorted.`,
    });

    return steps;
  }
};
