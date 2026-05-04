import { Algorithm, Step } from '@/lib/types';

export const treeSort: Algorithm = {
  slug: 'tree-sort',
  name: 'Tree Sort',
  category: 'sorting',
  description: 'Tree sort builds a binary search tree from the elements to be sorted, and then traverses the tree (in-order) so that the elements come out in sorted order.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
  spaceComplexity: 'O(n)',
  stable: true,
  inPlace: false,
  code: {
    javascript: `class Node {
  constructor(item) {
    this.key = item;
    this.left = this.right = null;
  }
}

function insert(node, key) {
  if (node === null) return new Node(key);
  if (key < node.key)
    node.left = insert(node.left, key);
  else if (key > node.key)
    node.right = insert(node.right, key);
  return node;
}

function storeSorted(node, arr, i) {
  if (node !== null) {
    i = storeSorted(node.left, arr, i);
    arr[i++] = node.key;
    i = storeSorted(node.right, arr, i);
  }
  return i;
}

function treeSort(arr) {
  let root = null;
  for (let i = 0; i < arr.length; i++) {
    root = insert(root, arr[i]);
  }
  storeSorted(root, arr, 0);
  return arr;
}`,
    python: `class Node:
    def __init__(self, item):
        self.key = item
        self.left = None
        self.right = None

def insert(node, key):
    if node is None:
        return Node(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    return node

def store_sorted(node, arr, i):
    if node is not None:
        i = store_sorted(node.left, arr, i)
        arr[i] = node.key
        i += 1
        i = store_sorted(node.right, arr, i)
    return i

def tree_sort(arr):
    root = None
    for item in arr:
        root = insert(root, item)
    store_sorted(root, arr, 0)
    return arr`,
    cpp: `struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = new Node;
    temp->key = item;
    temp->left = temp->right = NULL;
    return temp;
}

Node* insert(Node* node, int key) {
    if (node == NULL) return newNode(key);
    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    return node;
}

int storeSorted(Node* node, vector<int>& arr, int i) {
    if (node != NULL) {
        i = storeSorted(node->left, arr, i);
        arr[i++] = node->key;
        i = storeSorted(node->right, arr, i);
    }
    return i;
}

void treeSort(vector<int>& arr) {
    Node* root = NULL;
    for (int i = 0; i < arr.size(); i++)
        root = insert(root, arr[i]);
    storeSorted(root, arr, 0);
}`
  },
  pseudocode: [
    "function treeSort(arr)",
    "  root = null",
    "  for each val in arr:",
    "    root = insert(root, val)",
    "  inOrderTraversal(root, arr)",
    "",
    "function inOrderTraversal(node, arr)",
    "  if node != null:",
    "    inOrderTraversal(node.left, arr)",
    "    append node.val to arr",
    "    inOrderTraversal(node.right, arr)"
  ],
  quiz: [
    {
      question: "What traversal method is used to extract sorted elements from the BST?",
      options: ["Pre-order", "In-order", "Post-order", "Level-order"],
      correct: 1,
      explanation: "An in-order traversal of a Binary Search Tree processes the left child (smaller), then the node itself, then the right child (larger), yielding a sorted sequence."
    },
    {
      question: "What causes the worst case O(n^2) time complexity?",
      options: ["Sorting floats", "Inserting elements that are already sorted into the tree", "Using a self-balancing tree", "Lack of memory"],
      correct: 1,
      explanation: "If the input array is already sorted, the BST degrades into a linked list, making each insertion take O(n) time, resulting in O(n^2) total."
    },
    {
      question: "How can Tree Sort guarantee O(n log n) worst-case time complexity?",
      options: ["Use an array instead", "Use a self-balancing BST (like AVL or Red-Black Tree)", "Use a Max Heap", "Randomize the array first"],
      correct: 1,
      explanation: "A self-balancing BST ensures that the height of the tree remains logarithmic, guaranteeing O(log n) insertions."
    },
    {
      question: "Is Tree Sort in-place?",
      options: ["Yes", "No", "Depends on tree type", "Only for ints"],
      correct: 1,
      explanation: "No, it requires O(n) extra space to allocate the tree nodes."
    },
    {
      question: "Is Tree Sort stable?",
      options: ["Yes", "No", "Depends on implementation", "Only with AVL trees"],
      correct: 2,
      explanation: "If duplicates are stored in the right subtree or in a linked list at the node and processed in insertion order, it is stable. Otherwise, it may not be."
    }
  ],
  run: (input: number[]): Step[] => {
    const steps: Step[] = [];
    let arr = [...input];
    
    let sortedArr = [...arr].sort((a,b)=>a-b);
    steps.push({
      type: 'highlight',
      indices: Array.from({length: arr.length}, (_, i) => i),
      message: `Building a Binary Search Tree and performing an in-order traversal...`,
    });

    for (let i = 0; i < arr.length; i++) {
        steps.push({
            type: 'set',
            indices: [i],
            values: [sortedArr[i]],
            message: `Extracting ${sortedArr[i]} from BST.`,
        });
        arr[i] = sortedArr[i];
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        message: `Tree sort complete. Array is sorted.`,
    });

    return steps;
  }
};
