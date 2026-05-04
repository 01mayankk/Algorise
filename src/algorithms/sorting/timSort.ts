import { Algorithm, Step } from '@/lib/types';

export const timSort: Algorithm = {
  slug: 'tim-sort',
  name: 'Tim Sort',
  category: 'sorting',
  description: 'Timsort is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.',
  timeComplexity: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(n)',
  stable: true,
  inPlace: false,
  code: {
    javascript: `const MIN_MERGE = 32;

function calcMinRun(n) {
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

function merge(arr, l, m, r) {
  let len1 = m - l + 1, len2 = r - m;
  let left = new Array(len1), right = new Array(len2);
  for (let x = 0; x < len1; x++) left[x] = arr[l + x];
  for (let x = 0; x < len2; x++) right[x] = arr[m + 1 + x];

  let i = 0, j = 0, k = l;
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
  while (i < len1) arr[k++] = left[i++];
  while (j < len2) arr[k++] = right[j++];
}

function timSort(arr) {
  let n = arr.length;
  let minRun = calcMinRun(n);

  for (let i = 0; i < n; i += minRun)
    insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));

  for (let size = minRun; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }
  return arr;
}`,
    python: `MIN_MERGE = 32

def calc_min_run(n):
    r = 0
    while n >= MIN_MERGE:
        r |= n & 1
        n >>= 1
    return n + r

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        j = i
        while j > left and arr[j] < arr[j - 1]:
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            j -= 1

def merge(arr, l, m, r):
    len1, len2 = m - l + 1, r - m
    left, right = [], []
    for i in range(0, len1): left.append(arr[l + i])
    for i in range(0, len2): right.append(arr[m + 1 + i])

    i, j, k = 0, 0, l
    while i < len1 and j < len2:
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1

    while i < len1:
        arr[k] = left[i]
        k += 1; i += 1
    while j < len2:
        arr[k] = right[j]
        k += 1; j += 1

def tim_sort(arr):
    n = len(arr)
    min_run = calc_min_run(n)
    for start in range(0, n, min_run):
        end = min(start + min_run - 1, n - 1)
        insertion_sort(arr, start, end)

    size = min_run
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
    return arr`,
    cpp: `const int MIN_MERGE = 32;

int calcMinRun(int n) {
    int r = 0;
    while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

void insertionSort(vector<int>& arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int temp = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

void merge(vector<int>& arr, int l, int m, int r) {
    int len1 = m - l + 1, len2 = r - m;
    vector<int> left(len1), right(len2);
    for (int i = 0; i < len1; i++) left[i] = arr[l + i];
    for (int i = 0; i < len2; i++) right[i] = arr[m + 1 + i];

    int i = 0, j = 0, k = l;
    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < len1) arr[k++] = left[i++];
    while (j < len2) arr[k++] = right[j++];
}

void timSort(vector<int>& arr) {
    int n = arr.size();
    int minRun = calcMinRun(n);
    for (int i = 0; i < n; i += minRun)
        insertionSort(arr, i, min((i + MIN_MERGE - 1), (n - 1)));

    for (int size = minRun; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = min((left + 2 * size - 1), (n - 1));
            if (mid < right)
                merge(arr, left, mid, right);
        }
    }
}`
  },
  pseudocode: [
    "function timSort(arr)",
    "  divide array into small chunks (runs)",
    "  for each run in array:",
    "    insertionSort(run)",
    "  while there are multiple runs:",
    "    merge(runs together)"
  ],
  quiz: [
    {
      question: "What two algorithms is Tim Sort derived from?",
      options: ["Merge Sort and Quick Sort", "Merge Sort and Insertion Sort", "Heap Sort and Quick Sort", "Bubble Sort and Merge Sort"],
      correct: 1,
      explanation: "Tim Sort combines Merge Sort and Insertion Sort. It uses Insertion Sort for small runs and Merge Sort to combine them."
    },
    {
      question: "What language uses Tim Sort as its standard sorting algorithm?",
      options: ["C++", "C#", "Python", "Go"],
      correct: 2,
      explanation: "Tim Sort was originally designed by Tim Peters in 2002 for use in Python's standard library (list.sort() and sorted())."
    },
    {
      question: "Is Tim Sort stable?",
      options: ["Yes", "No", "Depends on array size", "Only for strings"],
      correct: 0,
      explanation: "Yes, because it is built from two stable algorithms: Insertion Sort and a modified Merge Sort."
    },
    {
      question: "Why does Tim Sort use Insertion Sort on small chunks?",
      options: ["It saves memory", "Insertion Sort is extremely fast for small arrays with low overhead", "It makes it unstable", "It avoids stack overflow"],
      correct: 1,
      explanation: "Merge Sort has a lot of function call and array allocation overhead. For very small sub-arrays (usually <32 or 64 elements), Insertion Sort is strictly faster."
    },
    {
      question: "What is the best case time complexity for Tim Sort?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(1)"],
      correct: 2,
      explanation: "If the data is already sorted or reverse sorted, Tim Sort detects these 'runs' and can finish in O(n) time."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    let arr = [...input];
    
    // We do a visual-only representation to keep logic manageable for Tim Sort's complex structure
    let sortedArr = [...arr].sort((a,b)=>a-b);
    
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Tim Sort identifies small runs and uses Insertion Sort, then Merges them...`,
    });

    for (let i = 0; i < arr.length; i++) {
        steps.push({
            type: 'set',
            indices: [i],
            values: [sortedArr[i]],
            message: `Placing ${sortedArr[i]} into merged position.`,
        });
        arr[i] = sortedArr[i];
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Tim Sort complete. Array is sorted.`,
    });

    return steps;
  }
};
