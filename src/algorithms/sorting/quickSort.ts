import { Algorithm, Step } from '@/lib/types';

export const quickSort: Algorithm = {
  slug: 'quick-sort',
  name: 'Quick Sort',
  category: 'sorting',
  description: 'Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
  spaceComplexity: 'O(log n)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}`,
    python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
  },
  pseudocode: [
    "function quickSort(arr, low, high)",
    "  if low < high",
    "    pi = partition(arr, low, high)",
    "    quickSort(arr, low, pi - 1)",
    "    quickSort(arr, pi + 1, high)",
    "",
    "function partition(arr, low, high)",
    "  pivot = arr[high]",
    "  i = low - 1",
    "  for j = low to high - 1",
    "    if arr[j] < pivot",
    "      i++",
    "      swap(arr[i], arr[j])",
    "  swap(arr[i + 1], arr[high])",
    "  return i + 1"
  ],
  quiz: [
    {
      question: "What is the worst case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"],
      correct: 2,
      explanation: "Worst case occurs when the pivot is always the smallest or largest element, leading to highly unbalanced partitions (e.g., already sorted array with last element as pivot)."
    },
    {
      question: "How can you mitigate the worst case in Quick Sort?",
      options: ["Always pick the first element as pivot", "Use Random pivot or Median-of-Three", "Never use it for arrays", "Increase array size"],
      correct: 1,
      explanation: "Randomized pivot selection heavily decreases the probability of hitting the worst-case O(n^2) behavior."
    },
    {
      question: "Is Quick Sort stable?",
      options: ["Yes", "No", "Depends on partition scheme", "Only for linked lists"],
      correct: 1,
      explanation: "Standard Quick Sort implementations are not stable because swapping elements over a distance changes relative orders of equal elements."
    },
    {
      question: "What is the space complexity of Quick Sort?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correct: 2,
      explanation: "While it sorts in-place, the recursive call stack takes O(log n) space on average."
    },
    {
      question: "Why is Quick Sort often faster than Merge Sort in practice?",
      options: ["It does fewer comparisons", "It has better CPU cache locality and doesn't allocate extra memory", "It's a stable sort", "It avoids recursion"],
      correct: 1,
      explanation: "In-place array modifications are extremely cache-friendly compared to the extra memory allocations and copying required by Merge Sort."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];

    function partition(low: number, high: number): number {
      const pivot = arr[high];
      let i = low - 1;

      steps.push({
        type: 'highlight',
        indices: [high],
        message: `Selected pivot ${pivot} at index ${high}.`,
      });

      for (let j = low; j < high; j++) {
        steps.push({
          type: 'compare',
          indices: [j, high],
          message: `Comparing ${arr[j]} with pivot ${pivot}.`,
        });

        if (arr[j] < pivot) {
          i++;
          if (i !== j) {
            steps.push({
              type: 'swap',
              indices: [i, j],
              message: `${arr[j]} < ${pivot}, swapping with element at index ${i}.`,
            });
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }

      steps.push({
        type: 'swap',
        indices: [i + 1, high],
        message: `Placing pivot ${pivot} in its correct sorted position at index ${i + 1}.`,
      });
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;

      steps.push({
        type: 'sorted',
        indices: [i + 1],
        message: `Pivot ${pivot} is now correctly placed.`,
      });

      return i + 1;
    }

    function quickSortRecursive(low: number, high: number) {
      if (low < high) {
        const pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      } else if (low === high) {
         steps.push({
          type: 'sorted',
          indices: [low],
          message: `Single element ${arr[low]} is naturally sorted.`,
        });
      }
    }

    quickSortRecursive(0, arr.length - 1);

    return steps;
  }
};
