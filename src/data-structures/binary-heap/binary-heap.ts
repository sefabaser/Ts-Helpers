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
  private _heap: BinaryHeapNode<T>[] = [];
  private _map = new Map<T, BinaryHeapNode<T>>();

  get size(): number {
    return this._heap.length;
  }

  private _comparator = (a: BinaryHeapNode<T>, b: BinaryHeapNode<T>): boolean => a.priority < b.priority;
  private _comparatorOrEqual = (a: BinaryHeapNode<T>, b: BinaryHeapNode<T>): boolean => a.priority <= b.priority;

  constructor(type: 'min' | 'max' = 'min') {
    if (type === 'max') {
      this._comparator = (a, b): boolean => a.priority > b.priority;
      this._comparatorOrEqual = (a, b): boolean => a.priority >= b.priority;
    }
  }

  add(priority: number, item: T): void {
    let node = new BinaryHeapNode<T>(priority, item, this._heap.length);
    this._heap.push(node);
    this._map.set(item, node);
    this._bubbleUp(node.index);
  }

  delete(item: T): boolean {
    let node = this._map.get(item);
    if (node) {
      let lastNode = this._heap.pop() as unknown as BinaryHeapNode<T>;
      if (this._heap.length > 0) {
        this._heap[node.index] = lastNode;
        lastNode.index = node.index;
        this._map.set(lastNode.item, lastNode);
        this._bubbleDown(node.index);
        this._bubbleUp(node.index);
      }
      this._map.delete(item);
      return true;
    } else {
      return false;
    }
  }

  pop(): T | undefined {
    if (this._heap.length > 0) {
      let topNode = this._heap[0];
      let lastNode = this._heap.pop() as unknown as BinaryHeapNode<T>;
      if (this._heap.length > 0) {
        this._heap[0] = lastNode;
        lastNode.index = 0;
        this._map.set(lastNode.item, lastNode);
        this._bubbleDown(0);
      }
      this._map.delete(topNode.item);
      return topNode.item;
    }
  }

  private _bubbleUp(index: number): void {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this._comparatorOrEqual(this._heap[parentIndex], this._heap[index])) {
        break;
      }

      [this._heap[parentIndex], this._heap[index]] = [this._heap[index], this._heap[parentIndex]];
      this._heap[parentIndex].index = parentIndex;
      this._heap[index].index = index;
      index = parentIndex;
    }
  }

  private _bubbleDown(index: number): void {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let currentIndex = index;

    if (leftChildIndex < this._heap.length && this._comparator(this._heap[leftChildIndex], this._heap[currentIndex])) {
      currentIndex = leftChildIndex;
    }

    if (rightChildIndex < this._heap.length && this._comparator(this._heap[rightChildIndex], this._heap[currentIndex])) {
      currentIndex = rightChildIndex;
    }

    if (currentIndex !== index) {
      [this._heap[index], this._heap[currentIndex]] = [this._heap[currentIndex], this._heap[index]];
      this._heap[index].index = index;
      this._heap[currentIndex].index = currentIndex;
      this._bubbleDown(currentIndex);
    }
  }
}
