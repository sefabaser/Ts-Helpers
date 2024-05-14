import { describe, expect, test } from 'vitest';

import { Vector } from './vector';

describe('Vector: ', () => {
  describe('IsEqual: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.isEqual(vec1, vec2)).toEqual(true);
    });

    test('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.isEqual(vec1, vec2)).toEqual(false);
    });

    test('sample 3', () => {
      let vec1 = { x: 0, y: 0 };
      expect(Vector.isEqual(vec1, undefined)).toEqual(false);
    });

    test('sample 4', () => {
      let vec2 = { x: 1, y: 1 };
      expect(Vector.isEqual(undefined, vec2)).toEqual(false);
    });

    test('sample 5', () => {
      expect(Vector.isEqual(undefined, undefined)).toEqual(false);
    });
  });

  describe('IsZero: ', () => {
    test('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.isZero(vec)).toEqual(true);
    });

    test('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.isZero(vec)).toEqual(false);
    });

    test('sample 3', () => {
      let vec = { x: 0, y: -1 };
      expect(Vector.isZero(vec)).toEqual(false);
    });

    test('sample 4', () => {
      let vec = { x: 1, y: 1 };
      expect(Vector.isZero(vec)).toEqual(false);
    });
  });

  describe('Sum: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 2, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 3, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 4, y: 1 });
    });

    test('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 5, y: 5 });
    });
  });

  describe('FromTo: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: -1, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 3, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 2, y: -1 });
    });

    test('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 3, y: 1 });
    });
  });

  describe('Multiply: ', () => {
    test('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.multiply(vec, 1)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.multiply(vec, 1)).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.multiply(vec, 2)).toEqual({ x: 2, y: 0 });
    });

    test('sample 4', () => {
      let vec = { x: 1, y: 1 };
      expect(Vector.multiply(vec, 2)).toEqual({ x: 2, y: 2 });
    });

    test('sample 5', () => {
      let vec = { x: 1, y: 2 };
      expect(Vector.multiply(vec, 2)).toEqual({ x: 2, y: 4 });
    });
  });

  describe('Divide: ', () => {
    test('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.divide(vec, 1)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.divide(vec, 1)).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.divide(vec, 2)).toEqual({ x: 0.5, y: 0 });
    });

    test('sample 4', () => {
      let vec = { x: 1, y: 1 };
      expect(Vector.divide(vec, 2)).toEqual({ x: 0.5, y: 0.5 });
    });

    test('sample 5', () => {
      let vec = { x: 1, y: 2 };
      expect(Vector.divide(vec, 2)).toEqual({ x: 0.5, y: 1 });
    });
  });

  describe('Round: ', () => {
    test('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = { x: 1.2, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec = { x: 1.5, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 2, y: 0 });
    });

    test('sample 5', () => {
      let vec = { x: 1.6, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 2, y: 0 });
    });
  });

  describe('Rotate: ', () => {
    test('basic rotation 1', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: -1 };
      expect(Vector.rotate(vec1, vec2, false)).toEqual({ x: 1, y: 0 });
    });

    test('basic rotation 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: -1, y: 0 };
      expect(Vector.rotate(vec1, vec2, false)).toEqual({ x: 0, y: -1 });
    });

    test('rotation with normalization', () => {
      let vec1 = { x: 3, y: 0 };
      let vec2 = { x: -2, y: 0 };
      expect(Vector.rotate(vec1, vec2)).toEqual({ x: 0, y: -3 });
    });

    test('complex rotation with normalization 1', () => {
      let vec1 = { x: 4, y: -3 };
      let vec2 = { x: -3, y: -4 };
      expect(Vector.rotate(vec1, vec2)).toEqual({ x: 1.4000000000000004, y: -4.800000000000001 });
    });

    test('complex rotation with normalization 2', () => {
      let vec1 = { x: 3, y: 2 };
      let vec2 = { x: -3, y: 1 };
      expect(Vector.rotate(vec1, vec2)).toEqual({ x: 0.9486832980505138, y: -3.478505426185217 });
    });
  });

  describe('Normalize: ', () => {
    test('sample 1', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.normalize(vec)).toEqual({ x: 1, y: 0 });
    });

    test('sample 2', () => {
      let vec = { x: 0, y: 1 };
      expect(Vector.normalize(vec)).toEqual({ x: 0, y: 1 });
    });

    test('sample 3', () => {
      let vec = { x: 3, y: 4 };
      expect(Vector.normalize(vec)).toEqual({ x: 0.6, y: 0.8 });
    });

    test('sample 4', () => {
      let vec = { x: 0.3, y: 0.4 };
      expect(Vector.normalize(vec)).toEqual({ x: 0.6, y: 0.8 });
    });

    test('sample 5', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.normalize(vec)).toEqual({ x: 0, y: 0 });
    });

    test('sample 6', () => {
      let vec = { x: 3, y: 4 };
      expect(Vector.normalize(vec, 10)).toEqual({ x: 6, y: 8 });
    });

    test('sample 7', () => {
      let vec = { x: 3, y: 4 };
      expect(Vector.normalize(vec, 0)).toEqual({ x: 0, y: 0 });
    });
  });

  describe('Projection: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 1 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 3, y: 0 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 1, y: 0 });
    });

    test('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 1.6, y: 1.2000000000000002 });
    });
  });

  describe('GetDotProduct: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(0);
    });

    test('sample 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(0);
    });

    test('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(1);
    });

    test('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(1);
    });

    test('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(10);
    });
  });

  describe('GetDistance: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(0);
    });

    test('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(1);
    });

    test('sample 3', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 1 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(1);
    });

    test('sample 4', () => {
      let vec1 = { x: 3, y: 0 };
      let vec2 = { x: 0, y: 4 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(5);
    });
  });

  describe('GetLength: ', () => {
    test('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.getLength(vec)).toEqual(0);
    });

    test('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.getLength(vec)).toEqual(1);
    });

    test('sample 3', () => {
      let vec = { x: 0, y: 1 };
      expect(Vector.getLength(vec)).toEqual(1);
    });

    test('sample 4', () => {
      let vec = { x: 3, y: 4 };
      expect(Vector.getLength(vec)).toEqual(5);
    });
  });

  describe('EnsureMaxLength: ', () => {
    test('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.ensureMaxLength(vec, 1)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.ensureMaxLength(vec, 1)).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.ensureMaxLength(vec, 2)).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec = { x: 1, y: 1 };
      expect(Vector.ensureMaxLength(vec, 2)).toEqual({ x: 1, y: 1 });
    });

    test('sample 5', () => {
      let vec = { x: 6, y: 8 };
      expect(Vector.ensureMaxLength(vec, 5)).toEqual({ x: 3, y: 4 });
    });
  });

  describe('Lerp: ', () => {
    test('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.lerp(vec1, vec2, 0)).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.lerp(vec1, vec2, 0)).toEqual({ x: 0, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.lerp(vec1, vec2, 1)).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.lerp(vec1, vec2, 0.5)).toEqual({ x: 0.5, y: 0 });
    });

    test('sample 5', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.lerp(vec1, vec2, 0.5)).toEqual({ x: 2.5, y: 2 });
    });

    test('sample 6', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.lerp(vec1, vec2, 0.75)).toEqual({ x: 3.25, y: 2.5 });
    });
  });
});
