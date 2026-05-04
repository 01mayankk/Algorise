import { Algorithm, Step } from '@/lib/types';

export const bucketSort: Algorithm = {
  slug: 'bucket-sort',
  name: 'Bucket Sort',
  category: 'sorting',
  description: 'Bucket sort is mainly useful when input is uniformly distributed over a range. It divides the array into a finite number of buckets, sorts them individually, and concatenates them.',
  timeComplexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n^2)' },
  spaceComplexity: 'O(n+k)',
  stable: true,
  inPlace: false,
  code: {
    javascript: `function bucketSort(arr) {
  if (arr.length === 0) return arr;
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  let bucketCount = Math.floor(Math.sqrt(arr.length));
  let buckets = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor((arr[i] - min) / (max - min + 1) * bucketCount);
    buckets[index].push(arr[i]);
  }

  let sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
    sortedArray.push(...buckets[i]);
  }

  return sortedArray;
}`,
    python: `def bucket_sort(arr):
    if len(arr) == 0: return arr
    min_val, max_val = min(arr), max(arr)
    bucket_count = int(len(arr) ** 0.5)
    buckets = [[] for _ in range(bucket_count)]

    for num in arr:
        index = int((num - min_val) / (max_val - min_val + 1) * bucket_count)
        buckets[index].append(num)

    sorted_array = []
    for bucket in buckets:
        bucket.sort()
        sorted_array.extend(bucket)

    return sorted_array`,
    cpp: `void bucketSort(vector<int>& arr) {
    if (arr.empty()) return;
    int min_val = *min_element(arr.begin(), arr.end());
    int max_val = *max_element(arr.begin(), arr.end());
    int bucketCount = sqrt(arr.size());
    vector<vector<int>> buckets(bucketCount);

    for (int i = 0; i < arr.size(); i++) {
        int index = ((arr[i] - min_val) * bucketCount) / (max_val - min_val + 1);
        buckets[index].push_back(arr[i]);
    }

    int index = 0;
    for (int i = 0; i < bucketCount; i++) {
        sort(buckets[i].begin(), buckets[i].end());
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}`
  },
  pseudocode: [
    "function bucketSort(arr)",
    "  buckets = create array of empty lists",
    "  for each element in arr:",
    "    insert element into buckets[hash(element)]",
    "  for each bucket in buckets:",
    "    sort(bucket)",
    "  concatenate all buckets back into arr"
  ],
  quiz: [
    {
      question: "When is Bucket Sort most efficient?",
      options: ["When input is reverse sorted", "When input is uniformly distributed", "When sorting strings", "When memory is limited"],
      correct: 1,
      explanation: "Bucket Sort is highly efficient (O(n)) when the elements are uniformly distributed across the range, causing each bucket to contain roughly the same number of elements."
    },
    {
      question: "What is the worst case time complexity of Bucket Sort?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(n^3)"],
      correct: 2,
      explanation: "If all elements fall into a single bucket and we use an O(n^2) sort (like insertion sort) for the buckets, the time complexity is O(n^2)."
    },
    {
      question: "Is Bucket Sort stable?",
      options: ["Yes", "No", "Depends on underlying sort", "Only for floats"],
      correct: 2,
      explanation: "Bucket sort is stable if the sorting algorithm used to sort the individual buckets is stable."
    },
    {
      question: "What is a common algorithm used to sort the individual buckets?",
      options: ["Radix Sort", "Bogo Sort", "Insertion Sort", "Counting Sort"],
      correct: 2,
      explanation: "Insertion sort is often used for the individual buckets because it is extremely fast for small arrays."
    },
    {
      question: "How does the number of buckets affect performance?",
      options: ["More buckets always means faster", "Too many buckets wastes memory, too few degrades to O(n^2)", "It doesn't affect time complexity", "Only prime number of buckets work"],
      correct: 1,
      explanation: "A balance is needed. Often, bucket count is set to n or sqrt(n) to balance memory overhead and bucket size."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    let arr = [...input];
    
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Distributing elements into buckets based on value...`,
    });

    let sortedArr = [...arr].sort((a,b)=>a-b);
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            type: 'set',
            indices: [i],
            values: [sortedArr[i]],
            message: `Placing ${sortedArr[i]} back from its bucket.`,
        });
        arr[i] = sortedArr[i];
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Bucket sort complete. Array is sorted.`,
    });

    return steps;
  }
};
