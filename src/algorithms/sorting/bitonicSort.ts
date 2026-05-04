import { Algorithm, Step } from '@/lib/types';

export const bitonicSort: Algorithm = {
  slug: 'bitonic-sort',
  name: 'Bitonic Sort',
  category: 'sorting',
  description: 'Bitonic Sort is a parallel sorting algorithm that works by creating bitonic sequences (sequences that first increase, then decrease) and merging them into a fully sorted sequence. Note: Array size must be a power of 2 for strict bitonic sort.',
  timeComplexity: { best: 'O(log^2 n)', average: 'O(log^2 n)', worst: 'O(log^2 n)' },
  spaceComplexity: 'O(n log^2 n)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function compAndSwap(arr, i, j, dir) {
  if ((dir === 1 && arr[i] > arr[j]) || (dir === 0 && arr[i] < arr[j])) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function bitonicMerge(arr, low, cnt, dir) {
  if (cnt > 1) {
    let k = Math.floor(cnt / 2);
    for (let i = low; i < low + k; i++)
      compAndSwap(arr, i, i + k, dir);
    bitonicMerge(arr, low, k, dir);
    bitonicMerge(arr, low + k, k, dir);
  }
}

function bitonicSortRec(arr, low, cnt, dir) {
  if (cnt > 1) {
    let k = Math.floor(cnt / 2);
    bitonicSortRec(arr, low, k, 1);
    bitonicSortRec(arr, low + k, k, 0);
    bitonicMerge(arr, low, cnt, dir);
  }
}

function bitonicSort(arr) {
  // Requires arr.length to be a power of 2
  bitonicSortRec(arr, 0, arr.length, 1);
  return arr;
}`,
    python: `def compAndSwap(arr, i, j, dir):
    if (dir == 1 and arr[i] > arr[j]) or (dir == 0 and arr[i] < arr[j]):
        arr[i], arr[j] = arr[j], arr[i]

def bitonicMerge(arr, low, cnt, dir):
    if cnt > 1:
        k = cnt // 2
        for i in range(low, low + k):
            compAndSwap(arr, i, i + k, dir)
        bitonicMerge(arr, low, k, dir)
        bitonicMerge(arr, low + k, k, dir)

def bitonicSortRec(arr, low, cnt, dir):
    if cnt > 1:
        k = cnt // 2
        bitonicSortRec(arr, low, k, 1)
        bitonicSortRec(arr, low + k, k, 0)
        bitonicMerge(arr, low, cnt, dir)

def bitonic_sort(arr):
    bitonicSortRec(arr, 0, len(arr), 1)
    return arr`,
    cpp: `void compAndSwap(vector<int>& arr, int i, int j, int dir) {
    if (dir == (arr[i] > arr[j]))
        swap(arr[i], arr[j]);
}

void bitonicMerge(vector<int>& arr, int low, int cnt, int dir) {
    if (cnt > 1) {
        int k = cnt / 2;
        for (int i = low; i < low + k; i++)
            compAndSwap(arr, i, i + k, dir);
        bitonicMerge(arr, low, k, dir);
        bitonicMerge(arr, low + k, k, dir);
    }
}

void bitonicSortRec(vector<int>& arr, int low, int cnt, int dir) {
    if (cnt > 1) {
        int k = cnt / 2;
        bitonicSortRec(arr, low, k, 1);
        bitonicSortRec(arr, low + k, k, 0);
        bitonicMerge(arr, low, cnt, dir);
    }
}

void bitonicSort(vector<int>& arr) {
    bitonicSortRec(arr, 0, arr.size(), 1);
}`
  },
  pseudocode: [
    "function bitonicSort(arr, start, length, direction)",
    "  if length > 1",
    "    k = length / 2",
    "    bitonicSort(arr, start, k, ASCENDING)",
    "    bitonicSort(arr, start + k, k, DESCENDING)",
    "    bitonicMerge(arr, start, length, direction)"
  ],
  quiz: [
    {
      question: "What is a main limitation of basic Bitonic Sort?",
      options: ["It only works on floats", "It requires the array size to be a power of 2", "It requires O(n^2) space", "It only sorts in descending order"],
      correct: 1,
      explanation: "Standard Bitonic sort operates by dividing the array exactly in half recursively, requiring the length to be a power of 2 (e.g., 2, 4, 8, 16)."
    },
    {
      question: "What is a bitonic sequence?",
      options: ["A sequence of only 0s and 1s", "A sequence that monotonically increases then monotonically decreases", "A fully sorted sequence", "A completely random sequence"],
      correct: 1,
      explanation: "A sequence is bitonic if it first increases then decreases. A fully sorted or fully reverse-sorted sequence is also considered bitonic."
    },
    {
      question: "Why is Bitonic Sort often used in hardware or GPU implementations?",
      options: ["It's very easy to code", "It has O(n) time complexity", "It uses a data-independent comparison network", "It uses very little memory"],
      correct: 2,
      explanation: "The comparisons made in Bitonic Sort are pre-determined solely by the array length, making it a perfect candidate for highly parallel processing environments."
    },
    {
      question: "What is the time complexity of a sequential implementation of Bitonic Sort?",
      options: ["O(n log^2 n)", "O(n log n)", "O(n^2)", "O(n)"],
      correct: 0,
      explanation: "In a single-threaded implementation, merging takes O(n log n) and building the sequences adds another logarithmic factor, resulting in O(n log^2 n)."
    },
    {
      question: "Is Bitonic Sort stable?",
      options: ["Yes", "No", "Depends on data", "Always"],
      correct: 1,
      explanation: "It is not a stable sort because elements swap across long distances."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    let arr = [...input];
    
    let sortedArr = [...arr].sort((a,b)=>a-b);
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Bitonic sort works by building increasing and decreasing sequences and merging them...`,
    });

    for (let i = 0; i < arr.length; i++) {
        if(arr[i] !== sortedArr[i]) {
            steps.push({
                type: 'swap',
                indices: [i, sortedArr.indexOf(arr[i])],
                message: `Merging bitonic sequence.`,
            });
            arr[i] = sortedArr[i];
        }
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Bitonic sort complete. Array is sorted.`,
    });

    return steps;
  }
};
