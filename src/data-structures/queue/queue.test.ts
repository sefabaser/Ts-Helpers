import { describe, expect, test } from 'vitest';
import { Queue } from './queue';

describe('Queue', () => {
  describe('Basic', () => {
    test('should return undefined when queue is empty', () => {
      let queue = new Queue<number>();

      expect(queue.pop()).toBe(undefined);
    });

    test('should return false when queue is not empty', () => {
      let queue = new Queue<number>(1);

      expect(queue.isEmpty).toBe(false);
    });

    test('should add elements to the queue', () => {
      let queue = new Queue<number>();

      queue.add(1, 2, 3);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('should add elements to the queue with first element', () => {
      let queue = new Queue<number>(1);

      queue.add(2, 3);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('peek should return the first element in the queue without removing it', () => {
      let queue = new Queue<number>(1);

      expect(queue.peek()).toBe(1);
      expect(queue.pop()).toBe(1);
    });
  });

  describe('Duplicate', () => {
    test('empty queue', () => {
      let queue = new Queue<number>();
      let duplicate = queue.duplicate();

      expect(duplicate.pop()).toBe(undefined);
    });

    test('queue with elements', () => {
      let queue = new Queue<number>(1);
      queue.add(2, 3);
      let duplicate = queue.duplicate();

      expect(duplicate.pop()).toBe(1);
      expect(duplicate.pop()).toBe(2);
      expect(duplicate.pop()).toBe(3);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('duplicate with deep copy', () => {
      let queue = new Queue<{ value: number }>({ value: 1 });
      let duplicate = queue.duplicate(item => ({ value: item.value }));

      expect(duplicate.peek()).toStrictEqual({ value: 1 });
      expect(queue.peek()).toStrictEqual({ value: 1 });
      expect(duplicate.peek() !== queue.peek()).toBeTruthy();
    });
  });
});
