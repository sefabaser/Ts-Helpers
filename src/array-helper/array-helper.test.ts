import { describe, expect, test } from 'vitest';

import { ArrayHelper } from './array-helper';

describe('Array Helper', () => {
  describe('createEmptyArray()', () => {
    test('should create an empty array of a given length', () => {
      expect(ArrayHelper.createEmptyArray(3)).toEqual([undefined, undefined, undefined]);
    });
  });

  describe('createIntegerArray()', () => {
    test('should create an array of integers from 0 to the given length', () => {
      expect(ArrayHelper.createIntegerArray(3)).toEqual([0, 1, 2]);
    });
  });
});
