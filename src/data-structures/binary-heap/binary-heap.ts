class BinaryHeapNode<T> {
  priority: number;
  item: T;
  index: number;

  constructor(priority: number, item: T, index: number) {
    this.priority = priority;
    this.item = item;
    this.index = index;
  }
}

export class BinaryHeap<T> {
  private heap: BinaryHeapNode<T>[] = [];
  private map = new Map<T, BinaryHeapNode<T>>();

  get size(): number {
    return this.heap.length;
  }

  private comparator = (a: BinaryHeapNode<T>, b: BinaryHeapNode<T>): boolean => a.priority < b.priority;
  private comparatorOrEqual = (a: BinaryHeapNode<T>, b: BinaryHeapNode<T>): boolean => a.priority <= b.priority;

  constructor(type: 'min' | 'max' = 'min') {
    if (type === 'max') {
      this.comparator = (a, b): boolean => a.priority > b.priority;
      this.comparatorOrEqual = (a, b): boolean => a.priority >= b.priority;
    }
  }

  add(priority: number, item: T): void {
    let node = new BinaryHeapNode<T>(priority, item, this.heap.length);
    this.heap.push(node);
    this.map.set(item, node);
    this.bubbleUp(node.index);
  }

  delete(item: T): boolean {
    let node = this.map.get(item);
    if (node) {
      let lastNode = this.heap.pop() as unknown as BinaryHeapNode<T>;
      if (this.heap.length > 0) {
        this.heap[node.index] = lastNode;
        lastNode.index = node.index;
        this.map.set(lastNode.item, lastNode);
        this.bubbleDown(node.index);
        this.bubbleUp(node.index);
      }
      this.map.delete(item);
      return true;
    } else {
      return false;
    }
  }

  pop(): T | undefined {
    if (this.heap.length > 0) {
      let topNode = this.heap[0];
      let lastNode = this.heap.pop() as unknown as BinaryHeapNode<T>;
      if (this.heap.length > 0) {
        this.heap[0] = lastNode;
        lastNode.index = 0;
        this.map.set(lastNode.item, lastNode);
        this.bubbleDown(0);
      }
      this.map.delete(topNode.item);
      return topNode.item;
    }
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.comparatorOrEqual(this.heap[parentIndex], this.heap[index])) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      this.heap[parentIndex].index = parentIndex;
      this.heap[index].index = index;
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let currentIndex = index;

    if (leftChildIndex < this.heap.length && this.comparator(this.heap[leftChildIndex], this.heap[currentIndex])) {
      currentIndex = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.comparator(this.heap[rightChildIndex], this.heap[currentIndex])) {
      currentIndex = rightChildIndex;
    }

    if (currentIndex !== index) {
      [this.heap[index], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[index]];
      this.heap[index].index = index;
      this.heap[currentIndex].index = currentIndex;
      this.bubbleDown(currentIndex);
    }
  }
}
