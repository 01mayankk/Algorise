import { Algorithm, Step } from '@/lib/types';

export const combSort: Algorithm = {
  slug: 'comb-sort',
  name: 'Comb Sort',
  category: 'sorting',
  description: 'Comb Sort is an improvement over Bubble Sort. Bubble Sort always compares adjacent values (gap = 1). Comb Sort improves on Bubble Sort by using a gap larger than 1 to eliminate small values near the end.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n^2 / 2^p)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  code: {
    javascript: `function getNextGap(gap) {
  gap = Math.floor((gap * 10) / 13);
  if (gap < 1) return 1;
  return gap;
}

function combSort(arr) {
  let n = arr.length;
  let gap = n;
  let swapped = true;
  while (gap !== 1 || swapped === true) {
    gap = getNextGap(gap);
    swapped = false;
    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        let temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;
        swapped = true;
      }
    }
  }
  return arr;
}`,
    python: `def get_next_gap(gap):
    gap = (gap * 10) // 13
    if gap < 1:
        return 1
    return gap

def comb_sort(arr):
    n = len(arr)
    gap = n
    swapped = True
    while gap != 1 or swapped:
        gap = get_next_gap(gap)
        swapped = False
        for i in range(0, n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True
    return arr`,
    cpp: `int getNextGap(int gap) {
    gap = (gap * 10) / 13;
    if (gap < 1) return 1;
    return gap;
}

void combSort(vector<int>& arr) {
    int n = arr.size();
    int gap = n;
    bool swapped = true;
    while (gap != 1 || swapped == true) {
        gap = getNextGap(gap);
        swapped = false;
        for (int i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                swap(arr[i], arr[i + gap]);
                swapped = true;
            }
        }
    }
}`
  },
  pseudocode: [
    "function combSort(arr)",
    "  gap = length(arr)",
    "  swapped = true",
    "  while gap > 1 or swapped = true",
    "    gap = floor(gap / 1.3)",
    "    swapped = false",
    "    for i from 0 to length(arr) - gap",
    "      if arr[i] > arr[i + gap]",
    "        swap(arr[i], arr[i + gap])",
    "        swapped = true"
  ],
  quiz: [
    {
      question: "What algorithm does Comb Sort improve upon?",
      options: ["Insertion Sort", "Bubble Sort", "Merge Sort", "Selection Sort"],
      correct: 1,
      explanation: "Comb Sort improves on Bubble Sort by eliminating 'turtles' (small values near the end of the list that take a long time to move to the front in Bubble Sort)."
    },
    {
      question: "What is the typical shrink factor used to calculate the next gap?",
      options: ["2.0", "1.5", "1.3", "3.14"],
      correct: 2,
      explanation: "The shrink factor is usually 1.3. Dividing the gap by 1.3 has been empirically shown to perform best."
    },
    {
      question: "When does Comb Sort terminate?",
      options: ["When gap reaches 0", "When gap reaches 1 and no swaps occur", "After N iterations", "When the array is partitioned"],
      correct: 1,
      explanation: "The algorithm stops when the gap is 1 (meaning it's just doing a final Bubble Sort pass) and no swaps were made, meaning it is sorted."
    },
    {
      question: "Is Comb Sort stable?",
      options: ["Yes", "No", "Depends on shrink factor", "Only if array is small"],
      correct: 1,
      explanation: "Because elements are swapped across large gaps, relative order of equal elements is not preserved."
    },
    {
      question: "What is a 'turtle' in the context of Bubble Sort and Comb Sort?",
      options: ["A slow CPU", "A small number near the end of the array", "A large number near the beginning of the array", "A completely sorted array"],
      correct: 1,
      explanation: "Small numbers near the end move very slowly (one position per pass) to the front in Bubble Sort. Comb Sort's large gaps allow these 'turtles' to jump forward quickly."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    let n = arr.length;
    let gap = n;
    let swapped = true;

    function getNextGap(g: number) {
      g = Math.floor((g * 10) / 13);
      if (g < 1) return 1;
      return g;
    }

    while (gap !== 1 || swapped) {
      gap = getNextGap(gap);
      swapped = false;
      
      steps.push({
        type: 'highlight',
        indices: Array.from({length: n}, (_, i) => i),
        message: `Current gap: ${gap}`,
      });

      for (let i = 0; i < n - gap; i++) {
        steps.push({
          type: 'compare',
          indices: [i, i + gap],
          message: `Comparing ${arr[i]} and ${arr[i + gap]} (gap ${gap})`,
        });

        if (arr[i] > arr[i + gap]) {
          steps.push({
            type: 'swap',
            indices: [i, i + gap],
            message: `${arr[i]} > ${arr[i + gap]}, swapping elements across gap.`,
          });
          const temp = arr[i];
          arr[i] = arr[i + gap];
          arr[i + gap] = temp;
          swapped = true;
        }
      }
    }
    
    steps.push({
      type: 'sorted',
      indices: Array.from({length: n}, (_, i) => i),
      message: `Comb Sort complete. Array is sorted.`,
    });

    return steps;
  }
};
