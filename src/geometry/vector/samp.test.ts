import { describe, expect, test } from 'vitest';

import { Vector } from './vector';

describe('IsZero: ', () => {
  test('sample 1', () => {
    let vec = new Vector(0, 0);
    expect(vec.isZero()).toEqual(true);
  });

  test('sample 2', () => {
    let vec = new Vector(1, 0);
    expect(vec.isZero()).toEqual(false);
  });

  test('sample 3', () => {
    let vec = new Vector(0, -1);
    expect(vec.isZero()).toEqual(false);
  });

  test('sample 4', () => {
    let vec = new Vector(1, 1);
    expect(vec.isZero()).toEqual(false);
  });
});
