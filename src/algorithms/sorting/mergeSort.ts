import { Algorithm, Step } from '@/lib/types';

export const mergeSort: Algorithm = {
  slug: 'merge-sort',
  name: 'Merge Sort',
  category: 'sorting',
  description: 'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(n)',
  stable: true,
  inPlace: false,
  code: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
    cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`
  },
  pseudocode: [
    "function mergeSort(arr, l, r)",
    "  if l >= r return",
    "  m = l + (r - l) / 2",
    "  mergeSort(arr, l, m)",
    "  mergeSort(arr, m + 1, r)",
    "  merge(arr, l, m, r)"
  ],
  quiz: [
    {
      question: "What is the time complexity of Merge Sort?",
      options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
      correct: 1,
      explanation: "Merge Sort always divides the array in half (log n steps) and merges them (n operations), resulting in O(n log n) time."
    },
    {
      question: "Is Merge Sort an in-place sorting algorithm?",
      options: ["Yes", "No", "Depends", "Only for arrays"],
      correct: 1,
      explanation: "Standard Merge Sort requires O(n) auxiliary space to merge the two halves."
    },
    {
      question: "Is Merge Sort stable?",
      options: ["Yes", "No", "Sometimes", "Only for strings"],
      correct: 0,
      explanation: "Merge sort is stable because during the merge phase, elements from the left half are chosen when equal to the right half."
    },
    {
      question: "What paradigm does Merge Sort use?",
      options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
      correct: 2,
      explanation: "It divides the problem into smaller subproblems (halves), solves them recursively, and merges the results."
    },
    {
      question: "Why might Quick Sort be preferred over Merge Sort for arrays?",
      options: ["Quick Sort is stable", "Merge Sort is O(n^2)", "Merge Sort requires extra O(n) space", "Merge Sort is harder to code"],
      correct: 2,
      explanation: "Quick sort is in-place and generally has better cache locality, making it faster in practice despite worst-case O(n^2)."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];

    function merge(l: number, m: number, r: number) {
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);

      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

      let i = 0, j = 0, k = l;

      while (i < n1 && j < n2) {
        steps.push({
          type: 'compare',
          indices: [l + i, m + 1 + j],
          message: `Comparing ${L[i]} (left half) and ${R[j]} (right half).`,
        });

        if (L[i] <= R[j]) {
          arr[k] = L[i];
          steps.push({
            type: 'set',
            indices: [k],
            values: [L[i]],
            message: `${L[i]} is smaller/equal, placing it at index ${k}.`,
          });
          i++;
        } else {
          arr[k] = R[j];
          steps.push({
            type: 'set',
            indices: [k],
            values: [R[j]],
            message: `${R[j]} is smaller, placing it at index ${k}.`,
          });
          j++;
        }
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        steps.push({
            type: 'set',
            indices: [k],
            values: [L[i]],
            message: `Placing remaining element ${L[i]} from left half at index ${k}.`,
        });
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        steps.push({
            type: 'set',
            indices: [k],
            values: [R[j]],
            message: `Placing remaining element ${R[j]} from right half at index ${k}.`,
        });
        j++;
        k++;
      }

      steps.push({
        type: 'sorted',
        indices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
        message: `Merged and sorted subarray from index ${l} to ${r}.`,
      });
    }

    function mergeSortRecursive(l: number, r: number) {
      if (l >= r) return;
      let m = l + Math.floor((r - l) / 2);
      
      steps.push({
        type: 'highlight',
        indices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
        message: `Dividing array from index ${l} to ${r} at midpoint ${m}.`,
      });

      mergeSortRecursive(l, m);
      mergeSortRecursive(m + 1, r);
      merge(l, m, r);
    }

    mergeSortRecursive(0, arr.length - 1);

    return steps;
  }
};
