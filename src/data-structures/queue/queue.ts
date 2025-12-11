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
  private _front: DoublyLinkedListNode<T> | undefined;
  private _end: DoublyLinkedListNode<T> | undefined;

  get empty(): boolean {
    return this._front === undefined;
  }

  get notEmpty(): boolean {
    return this._front !== undefined;
  }

  constructor(firstNode?: T | undefined) {
    if (firstNode) {
      let firstNodeInstance = new DoublyLinkedListNode(firstNode);
      this._front = firstNodeInstance;
      this._end = firstNodeInstance;
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

        if (this._front === node) {
          if (node.behind) {
            this._front = node.behind;
            node.behind.forward = undefined;
          } else {
            this._front = undefined;
            this._end = undefined;
          }
        } else if (this._end === node) {
          this._end = node.forward;
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
    if (this._front) {
      newNode.forward = this._end;
      this._end!.behind = newNode;
      this._end = newNode;
    } else {
      this._front = newNode;
      this._end = newNode;
    }

    return newNode;
  }

  /**
   * @returns Removes the first element and returns it
   * @compexity O(1)
   */
  pop(): T | undefined {
    if (this._front) {
      this._front.destroyed = true;

      let value = this._front.value;
      this._front = this._front.behind;
      if (this._front) {
        this._front.forward = undefined;
      } else {
        this._end = undefined;
      }
      return value;
    }
  }

  /**
   * @returns Removes the first element and returns it
   * @compexity O(1)
   */
  dequeue(): T | undefined {
    if (this._end) {
      this._end.destroyed = true;

      let value = this._end.value;
      this._end = this._end.forward;
      if (this._end) {
        this._end.behind = undefined;
      } else {
        this._front = undefined;
      }
      return value;
    }
  }

  /**
   * @returns The value of the first element in the queue without removing it
   * @compexity O(1)
   */
  peek(): T | undefined {
    return this._front?.value;
  }

  /**
   * @returns The value of the first element in the queue without removing it
   * @compexity O(1)
   */
  peekLast(): T | undefined {
    return this._end?.value;
  }

  /**
   * @param deepCopyItem An optional function that takes an item and returns a deep copy of it
   * @returns The duplicated queue
   * @compexity deepCopy ? O(n*deepCopy(T)) : O(n)
   */
  duplicate(deepCopyItem?: (item: T) => T): Queue<T> {
    let newQueue = new Queue<T>();
    let current = this._front;
    while (current) {
      let value = deepCopyItem ? deepCopyItem(current.value) : current.value;
      newQueue.add(value);
      current = current.behind;
    }
    return newQueue;
  }
}
