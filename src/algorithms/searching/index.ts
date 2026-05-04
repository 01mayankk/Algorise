import { linearSearch } from './linearSearch';
import { binarySearch } from './binarySearch';

export const searchingAlgorithms = [
  linearSearch,
  binarySearch,
];

// For quick lookup
export const searchingAlgorithmsMap = Object.fromEntries(
  searchingAlgorithms.map((algo) => [algo.slug, algo])
);
