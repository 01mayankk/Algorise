import { Algorithm, Step } from '@/lib/types';

export const shellSort: Algorithm = {
  slug: 'shell-sort',
  name: 'Shell Sort',
  category: 'sorting',
  description: 'Shell Sort is a generalized version of insertion sort. It first sorts elements that are far apart from each other and successively reduces the interval between the elements to be sorted.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n(log n)^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
    cpp: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
}`
  },
  pseudocode: [
    "function shellSort(arr)",
    "  gap = n / 2",
    "  while gap > 0",
    "    for i = gap to n - 1",
    "      temp = arr[i]",
    "      j = i",
    "      while j >= gap and arr[j - gap] > temp",
    "        arr[j] = arr[j - gap]",
    "        j -= gap",
    "      arr[j] = temp",
    "    gap /= 2"
  ],
  quiz: [
    {
      question: "What is Shell Sort fundamentally based on?",
      options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Heap Sort"],
      correct: 2,
      explanation: "Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart."
    },
    {
      question: "Is Shell Sort stable?",
      options: ["Yes", "No", "Depends on the gap sequence", "Only for small arrays"],
      correct: 1,
      explanation: "It is not stable because elements jump across gaps, which can alter the relative order of equal elements."
    },
    {
      question: "What happens when the gap reaches 1?",
      options: ["The algorithm terminates", "It performs a standard Insertion Sort", "It performs a Bubble Sort", "It randomizes the array"],
      correct: 1,
      explanation: "When gap = 1, it is exactly standard Insertion Sort. By this point, the array is nearly sorted, making the final pass very fast."
    },
    {
      question: "How does the gap sequence affect performance?",
      options: ["It doesn't", "It dictates the time complexity entirely", "It only affects space complexity", "It makes it unstable"],
      correct: 1,
      explanation: "The worst-case time complexity is heavily dependent on the chosen gap sequence (e.g., Shell's original sequence is O(n^2), but Hibbard's is O(n^1.5))."
    },
    {
      question: "Why use Shell Sort instead of Insertion Sort?",
      options: ["It requires less memory", "It's stable", "Elements can move long distances quickly, reducing total shifts", "It is easier to implement"],
      correct: 2,
      explanation: "Standard insertion sort only moves elements one position at a time. Shell sort moves them across 'gaps', resolving large disorders very quickly."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      steps.push({
        type: 'highlight',
        indices: Array.from({length: n}, (_, i) => i),
        message: `Sorting with gap = ${gap}`,
      });

      for (let i = gap; i < n; i++) {
        let temp = arr[i];
        let j;
        for (j = i; j >= gap; j -= gap) {
          steps.push({
            type: 'compare',
            indices: [j - gap, i],
            message: `Comparing ${arr[j - gap]} and ${temp} (gap ${gap})`,
          });
          if (arr[j - gap] > temp) {
             steps.push({
              type: 'swap',
              indices: [j - gap, j],
              message: `${arr[j - gap]} > ${temp}, shifting element up by ${gap}.`,
            });
            arr[j] = arr[j - gap];
          } else {
             break;
          }
        }
        arr[j] = temp;
      }
    }
    
    steps.push({
      type: 'sorted',
      indices: Array.from({length: n}, (_, i) => i),
      message: `Shell Sort complete. Array is fully sorted.`,
    });

    return steps;
  }
};
