class DoublyLinkedListNode<T> {
  value: T;
  previous: DoublyLinkedListNode<T> | undefined;
  next: DoublyLinkedListNode<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export class Queue<T> {
  private start: DoublyLinkedListNode<T> | undefined;
  private end: DoublyLinkedListNode<T> | undefined;

  get isEmpty(): boolean {
    return this.start === undefined;
  }

  constructor(firstNode?: T | undefined) {
    if (firstNode) {
      let firstNodeInstance = new DoublyLinkedListNode(firstNode);
      this.start = firstNodeInstance;
      this.end = firstNodeInstance;
    }
  }

  /**
   * @param args The values to add to end of the queue
   */
  add(...args: T[]): void {
    args.forEach(value => {
      let newNode = new DoublyLinkedListNode(value);
      if (this.start) {
        newNode.previous = this.end;
        this.end!.next = newNode;
        this.end = newNode;
      } else {
        this.start = newNode;
        this.end = newNode;
      }
    });
  }

  /**
   * @returns The value of the first element in the queue
   */
  pop(): T | undefined {
    if (this.start) {
      let value = this.start.value;
      this.start = this.start.next;
      if (this.start) {
        this.start.previous = undefined;
      } else {
        this.end = undefined;
      }
      return value;
    }
  }

  /**
   * @returns The value of the first element in the queue without removing it
   */
  peek(): T | undefined {
    return this.start?.value;
  }

  /**
   * @param deepCopyItem An optional function that takes an item and returns a deep copy of it
   * @returns The duplicated queue
   */
  duplicate(deepCopyItem?: (item: T) => T): Queue<T> {
    let newQueue = new Queue<T>();
    let current = this.start;
    while (current) {
      let value = deepCopyItem ? deepCopyItem(current.value) : current.value;
      newQueue.add(value);
      current = current.next;
    }
    return newQueue;
  }
}
