class DoublyLinkedListNode<T> {
  value: T;
  forward: DoublyLinkedListNode<T> | undefined;
  behind: DoublyLinkedListNode<T> | undefined;
  destroyed = false;

  constructor(value: T) {
    this.value = value;
  }
}

export class Queue<T> {
  private front: DoublyLinkedListNode<T> | undefined;
  private end: DoublyLinkedListNode<T> | undefined;

  get empty(): boolean {
    return this.front === undefined;
  }

  get notEmpty(): boolean {
    return this.front !== undefined;
  }

  constructor(firstNode?: T | undefined) {
    if (firstNode) {
      let firstNodeInstance = new DoublyLinkedListNode(firstNode);
      this.front = firstNodeInstance;
      this.end = firstNodeInstance;
    }
  }

  /**
   * @param value Adds the given element in queue
   * @compexity O(1)
   */
  add(value: T): void {
    this._add(value);
  }

  /**
   * @param args Adds the given elements in queue in the given order
   * @compexity O(1)
   */
  addMany(...args: T[]): void {
    for (let i = 0; i < args.length; i++) {
      let value = args[i];
      this._add(value);
    }
  }

  /**
   * @param value Adds the given element in queue
   * @compexity O(1)
   * @returns destroyer function that removes the added item from the queue when called
   */
  addWithDestroyer(value: T): () => void {
    let node = this._add(value);
    return () => {
      if (!node.destroyed) {
        node.destroyed = true;

        if (this.front === node) {
          if (node.behind) {
            this.front = node.behind;
            node.behind.forward = undefined;
          } else {
            this.front = undefined;
            this.end = undefined;
          }
        } else if (this.end === node) {
          this.end = node.forward;
          node.forward!.behind = undefined;
        } else {
          node.forward!.behind = node.behind;
          node.behind!.forward = node.forward;
        }
      }
    };
  }

  private _add(value: T): DoublyLinkedListNode<T> {
    let newNode = new DoublyLinkedListNode(value);
    if (this.front) {
      newNode.forward = this.end;
      this.end!.behind = newNode;
      this.end = newNode;
    } else {
      this.front = newNode;
      this.end = newNode;
    }

    return newNode;
  }

  /**
   * @returns Removes the first element and returns it
   * @compexity O(1)
   */
  pop(): T | undefined {
    if (this.front) {
      this.front.destroyed = true;

      let value = this.front.value;
      this.front = this.front.behind;
      if (this.front) {
        this.front.forward = undefined;
      } else {
        this.end = undefined;
      }
      return value;
    }
  }

  /**
   * @returns Removes the first element and returns it
   * @compexity O(1)
   */
  dequeue(): T | undefined {
    if (this.end) {
      this.end.destroyed = true;

      let value = this.end.value;
      this.end = this.end.forward;
      if (this.end) {
        this.end.behind = undefined;
      } else {
        this.front = undefined;
      }
      return value;
    }
  }

  /**
   * @returns The value of the first element in the queue without removing it
   * @compexity O(1)
   */
  peek(): T | undefined {
    return this.front?.value;
  }

  /**
   * @returns The value of the first element in the queue without removing it
   * @compexity O(1)
   */
  peekLast(): T | undefined {
    return this.end?.value;
  }

  /**
   * @param deepCopyItem An optional function that takes an item and returns a deep copy of it
   * @returns The duplicated queue
   * @compexity deepCopy ? O(n*deepCopy(T)) : O(n)
   */
  duplicate(deepCopyItem?: (item: T) => T): Queue<T> {
    let newQueue = new Queue<T>();
    let current = this.front;
    while (current) {
      let value = deepCopyItem ? deepCopyItem(current.value) : current.value;
      newQueue.add(value);
      current = current.behind;
    }
    return newQueue;
  }
}
