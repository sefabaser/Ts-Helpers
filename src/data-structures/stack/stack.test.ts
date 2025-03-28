import { describe, expect, test } from 'vitest';

import { Stack } from './stack';

describe('Stack', () => {
  describe('Basic', () => {
    test('should return undefined when stack is empty', () => {
      let stack = new Stack<number>();

      expect(stack.pop()).toBe(undefined);
    });

    test('should return false when stack is not empty', () => {
      let stack = new Stack<number>(1);

      expect(stack.isEmpty).toBe(false);
    });

    test('should add elements to the stack with keeping their order', () => {
      let stack = new Stack<number>();

      stack.add(1, 2, 3);

      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(3);
    });

    test('should add elements to the top of the stack', () => {
      let stack = new Stack<number>(3);

      stack.add(1, 2);

      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(3);
    });

    test('peek should return the first element in the stack without removing it', () => {
      let stack = new Stack<number>(1);

      expect(stack.peek()).toBe(1);
      expect(stack.pop()).toBe(1);
    });
  });

  describe('Duplicate', () => {
    test('empty stack', () => {
      let stack = new Stack<number>();
      let duplicate = stack.duplicate();

      expect(duplicate.pop()).toBe(undefined);
    });

    test('stack with elements', () => {
      let stack = new Stack<number>(3);
      stack.add(1, 2);
      let duplicate = stack.duplicate();

      expect(duplicate.pop()).toBe(1);
      expect(duplicate.pop()).toBe(2);
      expect(duplicate.pop()).toBe(3);

      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(3);
    });

    test('duplicate should deep copy', () => {
      let stack = new Stack<{ value: number }>({ value: 1 });
      let duplicate = stack.duplicate(item => ({ value: item.value }));

      expect(duplicate.peek()).toStrictEqual({ value: 1 });
      expect(stack.peek()).toStrictEqual({ value: 1 });
      expect(duplicate.peek() !== stack.peek()).toBeTruthy();
    });
  });
});
