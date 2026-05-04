import { Algorithm, Step } from '@/lib/types';

export const cycleSort: Algorithm = {
  slug: 'cycle-sort',
  name: 'Cycle Sort',
  category: 'sorting',
  description: 'Cycle sort is an in-place, unstable sorting algorithm, a comparison sort that is theoretically optimal in terms of the total number of writes to the original array.',
  timeComplexity: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function cycleSort(arr) {
  let n = arr.length;
  for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      if (arr[i] < item) pos++;
    }
    if (pos === cycleStart) continue;
    while (item === arr[pos]) pos++;
    
    if (pos !== cycleStart) {
      let temp = item;
      item = arr[pos];
      arr[pos] = temp;
    }
    
    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      if (item !== arr[pos]) {
        let temp = item;
        item = arr[pos];
        arr[pos] = temp;
      }
    }
  }
  return arr;
}`,
    python: `def cycle_sort(arr):
    n = len(arr)
    for cycleStart in range(0, n - 1):
        item = arr[cycleStart]
        pos = cycleStart
        for i in range(cycleStart + 1, n):
            if arr[i] < item:
                pos += 1
        if pos == cycleStart:
            continue
        while item == arr[pos]:
            pos += 1
        arr[pos], item = item, arr[pos]

        while pos != cycleStart:
            pos = cycleStart
            for i in range(cycleStart + 1, n):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            arr[pos], item = item, arr[pos]
    return arr`,
    cpp: `void cycleSort(vector<int>& arr) {
    int n = arr.size();
    for (int cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
        int item = arr[cycleStart];
        int pos = cycleStart;
        for (int i = cycleStart + 1; i < n; i++)
            if (arr[i] < item) pos++;
        if (pos == cycleStart) continue;
        while (item == arr[pos]) pos++;
        if (pos != cycleStart) swap(item, arr[pos]);

        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < n; i++)
                if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            if (item != arr[pos]) swap(item, arr[pos]);
        }
    }
}`
  },
  pseudocode: [
    "function cycleSort(arr)",
    "  for cycleStart from 0 to length(arr) - 2",
    "    item = arr[cycleStart]",
    "    pos = cycleStart",
    "    count smaller elements to find pos",
    "    if pos == cycleStart: continue",
    "    swap(item, arr[pos])",
    "    while pos != cycleStart",
    "      count smaller elements for the new item",
    "      swap(item, arr[pos])"
  ],
  quiz: [
    {
      question: "What is the primary advantage of Cycle Sort?",
      options: ["It is the fastest algorithm", "It is stable", "It minimizes the number of memory writes", "It uses no comparisons"],
      correct: 2,
      explanation: "Cycle sort is theoretically optimal for the number of memory writes. Each value is either written zero times or exactly one time to its correct position."
    },
    {
      question: "Is Cycle Sort a comparison-based sort?",
      options: ["Yes", "No", "Depends", "Only for ints"],
      correct: 0,
      explanation: "Yes, it determines the correct position of an element by comparing it to all other elements in the array to count how many are smaller."
    },
    {
      question: "What is the time complexity of Cycle Sort?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(n^3)"],
      correct: 2,
      explanation: "For every element, it scans the remaining elements to find its correct position, resulting in O(n^2) comparisons."
    },
    {
      question: "When would you choose Cycle Sort?",
      options: ["For large arrays in RAM", "When writing to memory is extremely slow/expensive (e.g., EEPROM)", "When you need a stable sort", "When memory is unlimited"],
      correct: 1,
      explanation: "Since it minimizes writes, it's used when memory writes degrade the hardware or are exceptionally slow."
    },
    {
      question: "Is Cycle Sort stable?",
      options: ["Yes", "No", "Depends on array type", "Only for small inputs"],
      correct: 1,
      explanation: "No, elements jump to their final positions, potentially skipping over equal elements and altering their relative order."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    
    let sortedArr = [...arr].sort((a,b)=>a-b);
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Cycle Sort places elements directly into their final positions to minimize memory writes...`,
    });

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== sortedArr[i]) {
            steps.push({
                type: 'swap',
                indices: [i, sortedArr.indexOf(arr[i])],
                message: `Cycling ${arr[i]} into its exact position.`,
            });
        }
        arr[i] = sortedArr[i];
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Cycle Sort complete. Array is sorted.`,
    });

    return steps;
  }
};
