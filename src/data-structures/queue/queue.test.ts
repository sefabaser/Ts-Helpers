import { describe, expect, test } from 'vitest';

import { Queue } from './queue';

describe('Queue', () => {
  describe('Constructor', () => {
    test('empty queue', () => {
      let queue = new Queue<number>();

      expect(queue.empty).toBe(true);
      expect(queue.notEmpty).toBe(false);
      expect(queue.peek()).toBe(undefined);
      expect(queue.peekLast()).toBe(undefined);
    });

    test('queue with initial element', () => {
      let queue = new Queue<number>(5);

      expect(queue.empty).toBe(false);
      expect(queue.notEmpty).toBe(true);
      expect(queue.peek()).toBe(5);
      expect(queue.peekLast()).toBe(5);
    });

    test('queue with string element', () => {
      let queue = new Queue<string>('hello');

      expect(queue.peek()).toBe('hello');
      expect(queue.pop()).toBe('hello');
      expect(queue.empty).toBe(true);
    });

    test('queue with object element', () => {
      let obj = { id: 1, name: 'test' };
      let queue = new Queue(obj);

      expect(queue.peek()).toBe(obj);
    });

    test('queue with undefined does not add element', () => {
      let queue = new Queue<number>(undefined);

      expect(queue.empty).toBe(true);
      expect(queue.peek()).toBe(undefined);
    });
  });

  describe('Empty and NotEmpty Getters', () => {
    test('empty queue returns true for empty', () => {
      let queue = new Queue<number>();

      expect(queue.empty).toBe(true);
      expect(queue.notEmpty).toBe(false);
    });

    test('non-empty queue returns false for empty', () => {
      let queue = new Queue<number>(1);

      expect(queue.empty).toBe(false);
      expect(queue.notEmpty).toBe(true);
    });

    test('queue becomes empty after popping all elements', () => {
      let queue = new Queue<number>(1);
      queue.add(2);

      expect(queue.empty).toBe(false);
      queue.pop();
      expect(queue.empty).toBe(false);
      queue.pop();
      expect(queue.empty).toBe(true);
    });

    test('queue becomes empty after dequeuing all elements', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      expect(queue.notEmpty).toBe(true);
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      expect(queue.notEmpty).toBe(false);
    });
  });

  describe('Add', () => {
    test('add single element to empty queue', () => {
      let queue = new Queue<number>();

      queue.add(1);

      expect(queue.peek()).toBe(1);
      expect(queue.peekLast()).toBe(1);
      expect(queue.pop()).toBe(1);
    });

    test('add multiple elements one by one', () => {
      let queue = new Queue<number>();

      queue.add(1);
      queue.add(2);
      queue.add(3);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('add to queue initialized with element', () => {
      let queue = new Queue<number>(10);

      queue.add(20);
      queue.add(30);

      expect(queue.pop()).toBe(10);
      expect(queue.pop()).toBe(20);
      expect(queue.pop()).toBe(30);
    });

    test('add maintains FIFO order', () => {
      let queue = new Queue<string>();

      queue.add('first');
      queue.add('second');
      queue.add('third');

      expect(queue.pop()).toBe('first');
      expect(queue.pop()).toBe('second');
      expect(queue.pop()).toBe('third');
    });

    test('add objects to queue', () => {
      let queue = new Queue<{ id: number }>();
      let obj1 = { id: 1 };
      let obj2 = { id: 2 };

      queue.add(obj1);
      queue.add(obj2);

      expect(queue.pop()).toBe(obj1);
      expect(queue.pop()).toBe(obj2);
    });
  });

  describe('AddMany', () => {
    test('add many elements to empty queue', () => {
      let queue = new Queue<number>();

      queue.addMany(1, 2, 3);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('add many to queue with initial element', () => {
      let queue = new Queue<number>(10);

      queue.addMany(1, 2, 3);

      expect(queue.pop()).toBe(10);
      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('add many with no arguments', () => {
      let queue = new Queue<number>();

      queue.addMany();

      expect(queue.empty).toBe(true);
    });

    test('add many with single element', () => {
      let queue = new Queue<number>();

      queue.addMany(42);

      expect(queue.pop()).toBe(42);
      expect(queue.empty).toBe(true);
    });

    test('add many maintains order', () => {
      let queue = new Queue<string>();

      queue.addMany('a', 'b', 'c', 'd', 'e');

      expect(queue.pop()).toBe('a');
      expect(queue.pop()).toBe('b');
      expect(queue.pop()).toBe('c');
      expect(queue.pop()).toBe('d');
      expect(queue.pop()).toBe('e');
    });

    test('multiple addMany calls', () => {
      let queue = new Queue<number>();

      queue.addMany(1, 2);
      queue.addMany(3, 4);
      queue.addMany(5);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(4);
      expect(queue.pop()).toBe(5);
    });

    test('addMany with large number of elements', () => {
      let queue = new Queue<number>();
      let elements = Array.from({ length: 100 }, (_, i) => i);

      queue.addMany(...elements);

      for (let i = 0; i < 100; i++) {
        expect(queue.pop()).toBe(i);
      }
      expect(queue.empty).toBe(true);
    });
  });

  describe('Pop', () => {
    test('pop from empty queue returns undefined', () => {
      let queue = new Queue<number>();

      expect(queue.pop()).toBe(undefined);
    });

    test('pop from single element queue', () => {
      let queue = new Queue<number>(1);

      expect(queue.pop()).toBe(1);
      expect(queue.empty).toBe(true);
    });

    test('pop removes front element', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      let first = queue.pop();

      expect(first).toBe(1);
      expect(queue.peek()).toBe(2);
    });

    test('pop all elements empties queue', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.pop();
      queue.pop();
      queue.pop();

      expect(queue.empty).toBe(true);
      expect(queue.pop()).toBe(undefined);
    });

    test('pop returns elements in FIFO order', () => {
      let queue = new Queue<string>();
      queue.addMany('first', 'second', 'third', 'fourth');

      expect(queue.pop()).toBe('first');
      expect(queue.pop()).toBe('second');
      expect(queue.pop()).toBe('third');
      expect(queue.pop()).toBe('fourth');
    });

    test('interleaving pop and add', () => {
      let queue = new Queue<number>();
      queue.add(1);
      queue.add(2);

      expect(queue.pop()).toBe(1);

      queue.add(3);
      queue.add(4);

      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(4);
    });

    test('pop after queue becomes empty and refilled', () => {
      let queue = new Queue<number>();
      queue.add(1);
      queue.pop();

      expect(queue.empty).toBe(true);

      queue.add(2);
      expect(queue.pop()).toBe(2);
    });
  });

  describe('Dequeue', () => {
    test('dequeue from empty queue returns undefined', () => {
      let queue = new Queue<number>();

      expect(queue.dequeue()).toBe(undefined);
    });

    test('dequeue from single element queue', () => {
      let queue = new Queue<number>(1);

      expect(queue.dequeue()).toBe(1);
      expect(queue.empty).toBe(true);
    });

    test('dequeue removes end element', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      let last = queue.dequeue();

      expect(last).toBe(3);
      expect(queue.peekLast()).toBe(2);
    });

    test('dequeue all elements empties queue', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.dequeue();
      queue.dequeue();
      queue.dequeue();

      expect(queue.empty).toBe(true);
      expect(queue.dequeue()).toBe(undefined);
    });

    test('dequeue returns elements in LIFO order', () => {
      let queue = new Queue<string>();
      queue.addMany('first', 'second', 'third', 'fourth');

      expect(queue.dequeue()).toBe('fourth');
      expect(queue.dequeue()).toBe('third');
      expect(queue.dequeue()).toBe('second');
      expect(queue.dequeue()).toBe('first');
    });

    test('interleaving dequeue and add', () => {
      let queue = new Queue<number>();
      queue.add(1);
      queue.add(2);

      expect(queue.dequeue()).toBe(2);

      queue.add(3);
      queue.add(4);

      expect(queue.dequeue()).toBe(4);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(1);
    });

    test('dequeue and pop can be mixed', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3, 4, 5);

      expect(queue.pop()).toBe(1);
      expect(queue.dequeue()).toBe(5);
      expect(queue.pop()).toBe(2);
      expect(queue.dequeue()).toBe(4);
      expect(queue.pop()).toBe(3);
      expect(queue.empty).toBe(true);
    });
  });

  describe('Peek', () => {
    test('peek on empty queue returns undefined', () => {
      let queue = new Queue<number>();

      expect(queue.peek()).toBe(undefined);
    });

    test('peek returns front element without removing it', () => {
      let queue = new Queue<number>(1);

      expect(queue.peek()).toBe(1);
      expect(queue.peek()).toBe(1);
      expect(queue.notEmpty).toBe(true);
    });

    test('peek returns first element from multiple elements', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      expect(queue.peek()).toBe(1);
      expect(queue.notEmpty).toBe(true);
    });

    test('peek after pop returns new front', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.pop();

      expect(queue.peek()).toBe(2);
    });

    test('peek after dequeue still returns front', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.dequeue();

      expect(queue.peek()).toBe(1);
    });

    test('peek with objects', () => {
      let obj = { value: 42 };
      let queue = new Queue<{ value: number }>();
      queue.add(obj);

      expect(queue.peek()).toBe(obj);
      expect(queue.peek()?.value).toBe(42);
    });

    test('multiple peeks do not affect queue', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.peek();
      queue.peek();
      queue.peek();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });
  });

  describe('PeekLast', () => {
    test('peekLast on empty queue returns undefined', () => {
      let queue = new Queue<number>();

      expect(queue.peekLast()).toBe(undefined);
    });

    test('peekLast returns end element without removing it', () => {
      let queue = new Queue<number>(1);

      expect(queue.peekLast()).toBe(1);
      expect(queue.peekLast()).toBe(1);
      expect(queue.notEmpty).toBe(true);
    });

    test('peekLast returns last element from multiple elements', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      expect(queue.peekLast()).toBe(3);
      expect(queue.notEmpty).toBe(true);
    });

    test('peekLast after add returns new end', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2);

      expect(queue.peekLast()).toBe(2);

      queue.add(3);

      expect(queue.peekLast()).toBe(3);
    });

    test('peekLast after dequeue returns new end', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.dequeue();

      expect(queue.peekLast()).toBe(2);
    });

    test('peekLast after pop still returns end', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.pop();

      expect(queue.peekLast()).toBe(3);
    });

    test('peek and peekLast on single element queue return same value', () => {
      let queue = new Queue<number>(42);

      expect(queue.peek()).toBe(queue.peekLast());
    });

    test('peek and peekLast on multi-element queue return different values', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      expect(queue.peek()).toBe(1);
      expect(queue.peekLast()).toBe(3);
      expect(queue.peek()).not.toBe(queue.peekLast());
    });

    test('multiple peekLast do not affect queue', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      queue.peekLast();
      queue.peekLast();
      queue.peekLast();

      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(1);
    });
  });

  describe('Duplicate', () => {
    test('empty queue', () => {
      let queue = new Queue<number>();
      let duplicate = queue.duplicate();

      expect(duplicate.empty).toBe(true);
      expect(duplicate.pop()).toBe(undefined);
    });

    test('single element queue', () => {
      let queue = new Queue<number>(42);
      let duplicate = queue.duplicate();

      expect(duplicate.pop()).toBe(42);
      expect(queue.pop()).toBe(42);
      expect(duplicate.empty).toBe(true);
      expect(queue.empty).toBe(true);
    });

    test('queue with elements maintains order', () => {
      let queue = new Queue<number>(1);
      queue.addMany(2, 3);
      let duplicate = queue.duplicate();

      expect(duplicate.pop()).toBe(1);
      expect(duplicate.pop()).toBe(2);
      expect(duplicate.pop()).toBe(3);

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
    });

    test('duplicate without deep copy shares object references', () => {
      let obj1 = { value: 1 };
      let obj2 = { value: 2 };
      let queue = new Queue<{ value: number }>();
      queue.add(obj1);
      queue.add(obj2);

      let duplicate = queue.duplicate();

      expect(duplicate.peek()).toBe(obj1);
      expect(queue.peek()).toBe(obj1);
      expect(duplicate.peek()).toBe(queue.peek());
    });

    test('duplicate with deep copy creates independent objects', () => {
      let queue = new Queue<{ value: number }>({ value: 1 });
      queue.add({ value: 2 });
      let duplicate = queue.duplicate(item => ({ value: item.value }));

      expect(duplicate.peek()).toStrictEqual({ value: 1 });
      expect(queue.peek()).toStrictEqual({ value: 1 });
      expect(duplicate.peek()).not.toBe(queue.peek());

      queue.peek()!.value = 100;

      expect(queue.peek()!.value).toBe(100);
      expect(duplicate.peek()!.value).toBe(1);
    });

    test('modifying original does not affect duplicate', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3, 4, 5);
      let duplicate = queue.duplicate();

      queue.pop();
      queue.pop();

      expect(queue.peek()).toBe(3);
      expect(duplicate.peek()).toBe(1);
    });

    test('modifying duplicate does not affect original', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3, 4, 5);
      let duplicate = queue.duplicate();

      duplicate.dequeue();
      duplicate.dequeue();

      expect(duplicate.peekLast()).toBe(3);
      expect(queue.peekLast()).toBe(5);
    });

    test('duplicate preserves all elements', () => {
      let queue = new Queue<number>();
      let elements = Array.from({ length: 50 }, (_, i) => i);
      queue.addMany(...elements);

      let duplicate = queue.duplicate();

      for (let i = 0; i < 50; i++) {
        expect(duplicate.pop()).toBe(i);
      }
      expect(duplicate.empty).toBe(true);
      expect(queue.notEmpty).toBe(true);
    });

    test('duplicate with complex deep copy function', () => {
      let queue = new Queue<{ id: number; nested: { value: string } }>();
      queue.add({ id: 1, nested: { value: 'test1' } });
      queue.add({ id: 2, nested: { value: 'test2' } });

      let duplicate = queue.duplicate(item => ({
        id: item.id,
        nested: { value: item.nested.value }
      }));

      let origPeek = queue.peek();
      let dupPeek = duplicate.peek();

      expect(origPeek).toStrictEqual(dupPeek);
      expect(origPeek).not.toBe(dupPeek);
      expect(origPeek!.nested).not.toBe(dupPeek!.nested);
    });

    test('multiple duplicates are independent', () => {
      let queue = new Queue<number>();
      queue.addMany(1, 2, 3);

      let dup1 = queue.duplicate();
      let dup2 = queue.duplicate();

      dup1.pop();
      dup2.dequeue();

      expect(dup1.peek()).toBe(2);
      expect(dup2.peekLast()).toBe(2);
      expect(queue.peek()).toBe(1);
    });
  });

  describe('AddWithDestroyer', () => {
    test('basic destroyer removes element', () => {
      let queue = new Queue<number>();
      queue.add(1);
      let destroyer = queue.addWithDestroyer(2);
      queue.add(3);

      destroyer();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(3);
      expect(queue.empty).toBe(true);
    });

    test('destroyer on single element empties queue', () => {
      let queue = new Queue<number>();
      let destroyer = queue.addWithDestroyer(1);

      expect(queue.notEmpty).toBe(true);

      destroyer();

      expect(queue.empty).toBe(true);
    });

    test('destroyer on front node', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      queue.add(2);
      queue.add(3);

      destroyer1();

      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
      expect(queue.empty).toBe(true);
    });

    test('destroyer on end node', () => {
      let queue = new Queue<number>();
      queue.add(1);
      queue.add(2);
      let destroyer3 = queue.addWithDestroyer(3);

      destroyer3();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.empty).toBe(true);
    });

    test('destroyer on middle node', () => {
      let queue = new Queue<number>();
      queue.add(1);
      let destroyer2 = queue.addWithDestroyer(2);
      queue.add(3);

      destroyer2();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(3);
      expect(queue.empty).toBe(true);
    });

    test('multiple destroyers used correctly', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      let destroyer2 = queue.addWithDestroyer(2);
      let destroyer3 = queue.addWithDestroyer(3);
      let destroyer4 = queue.addWithDestroyer(4);
      let destroyer5 = queue.addWithDestroyer(5);

      destroyer2();
      destroyer4();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(5);
      expect(queue.empty).toBe(true);

      destroyer1();
      destroyer3();
      destroyer5();

      expect(queue.empty).toBe(true);
    });

    test('destroyer can be saved and called later', () => {
      let queue = new Queue<number>();
      let destroyers: Array<() => void> = [];

      for (let i = 0; i < 10; i++) {
        destroyers.push(queue.addWithDestroyer(i));
      }

      destroyers[5]();
      destroyers[2]();
      destroyers[8]();

      let expected = [0, 1, 3, 4, 6, 7, 9];
      for (let i = 0; i < expected.length; i++) {
        expect(queue.pop()).toBe(expected[i]);
      }
    });

    test('calling destroyer twice on front node is handled safely', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      queue.add(2);
      queue.add(3);

      destroyer1();

      expect(queue.pop()).toBe(2);

      destroyer1();

      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(undefined);
    });

    test('calling destroyer after pop is handled safely', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      queue.add(2);
      queue.add(3);

      expect(queue.pop()).toBe(1);

      destroyer1();

      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(undefined);
    });

    test('calling destroyer after dequeue is handled safely', () => {
      let queue = new Queue<number>();
      queue.add(1);
      queue.add(2);
      let destroyer3 = queue.addWithDestroyer(3);

      expect(queue.dequeue()).toBe(3);

      destroyer3();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(undefined);
    });

    test('removing middle node when node is not in middle anymore is handled safely', () => {
      let queue = new Queue<number>();
      queue.add(1);
      let destroyer2 = queue.addWithDestroyer(2);
      queue.add(3);
      queue.add(4);

      queue.pop();
      queue.pop();

      destroyer2();

      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(4);
      expect(queue.pop()).toBe(undefined);
    });

    test('removing node from two-node queue where destroyer thinks its in middle', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      let destroyer2 = queue.addWithDestroyer(2);
      let destroyer3 = queue.addWithDestroyer(3);

      destroyer2();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(3);

      queue.add(4);
      let destroyer5 = queue.addWithDestroyer(5);
      queue.add(6);

      destroyer1();
      destroyer3();

      destroyer5();

      expect(queue.pop()).toBe(4);
      expect(queue.pop()).toBe(6);
      expect(queue.pop()).toBe(undefined);
    });

    test('calling destroyer on node that became end node after other removals', () => {
      let queue = new Queue<number>();
      queue.add(1);
      let destroyer2 = queue.addWithDestroyer(2);
      queue.add(3);

      expect(queue.dequeue()).toBe(3);

      destroyer2();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(undefined);
    });

    test('calling destroyer on node that became front node after other removals', () => {
      let queue = new Queue<number>();
      queue.add(1);
      let destroyer2 = queue.addWithDestroyer(2);
      queue.add(3);

      expect(queue.pop()).toBe(1);

      destroyer2();

      expect(queue.pop()).toBe(3);
      expect(queue.pop()).toBe(undefined);
    });

    test('destroyer on middle node after other nodes removed works correctly', () => {
      let queue = new Queue<number>();
      queue.add(1);
      let destroyer2 = queue.addWithDestroyer(2);
      let destroyer3 = queue.addWithDestroyer(3);
      queue.add(4);

      destroyer3();

      destroyer2();

      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(4);
      expect(queue.pop()).toBe(undefined);
    });

    test('multiple destroyers called in complex order', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      let destroyer2 = queue.addWithDestroyer(2);
      let destroyer3 = queue.addWithDestroyer(3);
      let destroyer4 = queue.addWithDestroyer(4);
      let destroyer5 = queue.addWithDestroyer(5);

      destroyer3();
      destroyer1();
      destroyer5();

      expect(queue.pop()).toBe(2);
      expect(queue.pop()).toBe(4);

      destroyer2();
      destroyer4();

      expect(queue.pop()).toBe(undefined);
    });

    test('destroyer called on node in queue with only that node left after others removed', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      let destroyer2 = queue.addWithDestroyer(2);
      let destroyer3 = queue.addWithDestroyer(3);

      destroyer1();
      destroyer3();

      destroyer2();

      expect(queue.pop()).toBe(undefined);
      expect(queue.empty).toBe(true);
    });

    test('interleaving destroyers with pop and dequeue in complex pattern', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      let destroyer2 = queue.addWithDestroyer(2);
      let destroyer3 = queue.addWithDestroyer(3);
      let destroyer4 = queue.addWithDestroyer(4);
      let destroyer5 = queue.addWithDestroyer(5);
      let destroyer6 = queue.addWithDestroyer(6);
      let destroyer7 = queue.addWithDestroyer(7);

      destroyer4();
      expect(queue.pop()).toBe(1);
      destroyer6();
      expect(queue.dequeue()).toBe(7);
      destroyer2();
      destroyer5();
      expect(queue.pop()).toBe(3);

      destroyer1();
      destroyer3();
      destroyer7();

      expect(queue.pop()).toBe(undefined);
      expect(queue.empty).toBe(true);
    });

    test('removing end node which causes front node to have undefined behind', () => {
      let queue = new Queue<number>();
      let destroyer1 = queue.addWithDestroyer(1);
      let destroyer2 = queue.addWithDestroyer(2);

      destroyer2();

      expect(queue.pop()).toBe(1);
      expect(queue.empty).toBe(true);

      destroyer1();

      expect(queue.empty).toBe(true);
    });

    test('stress test with many nodes and random destroyer calls', () => {
      let queue = new Queue<number>();
      let destroyers: Array<() => void> = [];

      for (let i = 0; i < 20; i++) {
        destroyers.push(queue.addWithDestroyer(i));
      }

      destroyers[5]();
      destroyers[15]();
      destroyers[10]();
      destroyers[0]();
      destroyers[19]();
      destroyers[7]();
      destroyers[12]();
      destroyers[3]();

      let expected = [1, 2, 4, 6, 8, 9, 11, 13, 14, 16, 17, 18];
      for (let i = 0; i < expected.length; i++) {
        expect(queue.pop()).toBe(expected[i]);
      }

      expect(queue.pop()).toBe(undefined);
      expect(queue.empty).toBe(true);
    });
  });
});
