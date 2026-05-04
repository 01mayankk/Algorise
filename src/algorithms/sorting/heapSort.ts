import { Algorithm, Step } from '@/lib/types';

export const heapSort: Algorithm = {
  slug: 'heap-sort',
  name: 'Heap Sort',
  category: 'sorting',
  description: 'Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest != i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
  return arr;
}`,
    python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n and arr[i] < arr[l]:
        largest = l
    if r < n and arr[largest] < arr[r]:
        largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr`,
    cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
  },
  pseudocode: [
    "function heapSort(arr)",
    "  buildMaxHeap(arr)",
    "  for i = arr.length - 1 down to 1",
    "    swap(arr[0], arr[i])",
    "    heapify(arr, i, 0)",
    "",
    "function heapify(arr, n, i)",
    "  largest = i",
    "  l = 2 * i + 1",
    "  r = 2 * i + 2",
    "  if l < n and arr[l] > arr[largest] largest = l",
    "  if r < n and arr[r] > arr[largest] largest = r",
    "  if largest != i",
    "    swap(arr[i], arr[largest])",
    "    heapify(arr, n, largest)"
  ],
  quiz: [
    {
      question: "What is the time complexity of building the initial Max Heap?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
      correct: 2,
      explanation: "Building the max heap from the bottom up (starting from n/2 down to 0) takes O(n) time."
    },
    {
      question: "Is Heap Sort stable?",
      options: ["Yes", "No", "Depends", "Only for max heaps"],
      correct: 1,
      explanation: "Heap sort is not stable because operations on the heap can change the relative order of equal elements."
    },
    {
      question: "What type of heap is typically used for sorting an array in ascending order?",
      options: ["Min Heap", "Max Heap", "Fibonacci Heap", "Binomial Heap"],
      correct: 1,
      explanation: "A Max Heap places the largest element at the root. We swap it to the end of the array to sort in ascending order."
    },
    {
      question: "How does Heap Sort compare to Quick Sort?",
      options: ["Heap Sort is faster on average", "Quick Sort has a better worst-case time", "Heap Sort guarantees O(n log n) worst-case", "They are identical"],
      correct: 2,
      explanation: "Quick Sort has a worst-case of O(n^2), while Heap Sort guarantees O(n log n) in all cases, though Quick Sort is generally faster in practice."
    },
    {
      question: "In an array representation of a zero-indexed heap, where are the children of node at index 'i'?",
      options: ["i+1 and i+2", "2i and 2i+1", "2i+1 and 2i+2", "i/2 and i*2"],
      correct: 2,
      explanation: "For a zero-indexed array, the left child is at 2*i + 1 and the right child is at 2*i + 2."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];

    function heapify(n: number, i: number) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;

      if (l < n) {
        steps.push({
          type: 'compare',
          indices: [l, largest],
          message: `Comparing left child ${arr[l]} with parent ${arr[largest]}.`,
        });
        if (arr[l] > arr[largest]) {
          largest = l;
        }
      }

      if (r < n) {
        steps.push({
          type: 'compare',
          indices: [r, largest],
          message: `Comparing right child ${arr[r]} with current largest ${arr[largest]}.`,
        });
        if (arr[r] > arr[largest]) {
          largest = r;
        }
      }

      if (largest !== i) {
        steps.push({
          type: 'swap',
          indices: [i, largest],
          message: `Swapping parent ${arr[i]} with largest child ${arr[largest]} to maintain max-heap property.`,
        });
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        heapify(n, largest);
      } else {
         steps.push({
          type: 'highlight',
          indices: [i],
          message: `Heap property maintained at index ${i}.`,
        });
      }
    }

    const n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        type: 'swap',
        indices: [0, i],
        message: `Swapping root (maximum) ${arr[0]} to the end position ${i}.`,
      });
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      steps.push({
        type: 'sorted',
        indices: [i],
        message: `${arr[i]} is securely in its final sorted position.`,
      });

      heapify(i, 0);
    }

    if (n > 0) {
      steps.push({
        type: 'sorted',
        indices: [0],
        message: `The first element ${arr[0]} is securely in its final sorted position.`,
      });
    }

    return steps;
  }
};
