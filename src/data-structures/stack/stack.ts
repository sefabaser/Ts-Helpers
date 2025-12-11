class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export class Stack<T> {
  private _start: LinkedListNode<T> | undefined;

  get isEmpty(): boolean {
    return this._start === undefined;
  }

  constructor(firstNode?: T | undefined) {
    if (firstNode) {
      let firstNodeInstance = new LinkedListNode(firstNode);
      this._start = firstNodeInstance;
    }
  }

  /**
   * @param args The values to add to start of the stack with keeping the given order, without inverting them
   */
  add(...args: T[]): void {
    let previouslyFirstNode = this._start;
    let lastNode: LinkedListNode<T> | undefined;

    args.forEach(value => {
      if (lastNode === undefined) {
        lastNode = new LinkedListNode(value);
        this._start = lastNode;
      } else {
        lastNode.next = new LinkedListNode(value);
        lastNode = lastNode.next;
      }
    });

    if (lastNode) {
      lastNode.next = previouslyFirstNode;
    }
  }

  /**
   * @returns The value of the first element in the stack
   */
  pop(): T | undefined {
    if (this._start) {
      let value = this._start.value;
      this._start = this._start.next;
      return value;
    }
  }

  /**
   * @returns The value of the first element in the stack without removing it
   */
  peek(): T | undefined {
    return this._start?.value;
  }

  /**
   * @param deepCopyItem An optional function that takes an item and returns a deep copy of it
   * @returns The duplicated stack
   */
  duplicate(deepCopyItem?: (item: T) => T): Stack<T> {
    let newStack = new Stack<T>();

    let firstNode: LinkedListNode<T> | undefined;
    let lastNode: LinkedListNode<T> | undefined;

    let current = this._start;
    while (current) {
      let value = deepCopyItem ? deepCopyItem(current.value) : current.value;
      let node = new LinkedListNode(value);

      if (firstNode === undefined) {
        firstNode = node;
        lastNode = node;
      } else {
        lastNode!.next = node;
        lastNode = node;
      }

      current = current.next;
    }

    newStack._start = firstNode;
    return newStack;
  }
}
