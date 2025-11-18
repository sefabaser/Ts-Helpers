import { describe, expect, test, vi } from 'vitest';

import { UnitTestHelper } from './unit-test.helper';

describe('Unit Test Helper', () => {
  describe('callEachDelayed', () => {
    test('fake timers seperate advance', async () => {
      vi.useFakeTimers();

      let heap: string[] = [];

      UnitTestHelper.callEachDelayed(
        ['a', 'b', 'c'],
        value => {
          heap.push(value);
        },
        { duration: 1 }
      );

      await vi.advanceTimersByTimeAsync(1);
      await vi.advanceTimersByTimeAsync(1);
      await vi.advanceTimersByTimeAsync(1);

      expect(heap).toEqual(['a', 'b', 'c']);

      vi.useRealTimers();
    });

    test('fake timers single advance', async () => {
      vi.useFakeTimers();

      let heap: string[] = [];

      UnitTestHelper.callEachDelayed(
        ['a', 'b', 'c'],
        value => {
          heap.push(value);
        },
        { duration: 1 }
      );

      await vi.advanceTimersByTimeAsync(3);

      expect(heap).toEqual(['a', 'b', 'c']);

      vi.useRealTimers();
    });
  });

  describe('testPerformance', () => {
    test('sample case', async () => {
      let result = await UnitTestHelper.testPerformance(
        () => {
          let arr = [];
          arr.sort();
        },
        { printResult: false, repetationCount: 1, sampleCount: 1 }
      );

      expect(typeof result).toBe('number');
    });

    test('console error should cancel further repetations and samples', async () => {
      await expect(() =>
        UnitTestHelper.testPerformance(
          () => {
            console.error('test');
          },
          { printResult: false, repetationCount: 2, sampleCount: 2 }
        )
      ).rejects.toThrowError('test');
    });

    test('thrown error should cancel further repetations and samples', async () => {
      let triggerCount = 0;
      await expect(() =>
        UnitTestHelper.testPerformance(
          () => {
            triggerCount++;
            throw new Error('test');
          },
          { printResult: false, repetationCount: 2, sampleCount: 2 }
        )
      ).rejects.toThrowError('test');

      expect(triggerCount).toEqual(1);
    });

    test('thrown error in microtask should cancel further repetations and samples', async () => {
      vi.useFakeTimers();

      let triggerCount = 0;
      expect(() => {
        UnitTestHelper.testPerformance(
          () => {
            triggerCount++;
            queueMicrotask(() => {
              throw new Error('test');
            });
          },
          { printResult: false, repetationCount: 2, sampleCount: 2 }
        );

        vi.runAllTimers();
      }).toThrowError('test');

      expect(triggerCount).toEqual(1);
    });
  });
});
