import { describe, expect, test } from 'vitest';

import { Rectangle } from './rectangle';
import { Vector } from '../vector/vector';

describe('Rectangle: ', () => {
  describe('fromRect: ', () => {
    test('sample 1', () => {
      expect(Rectangle.fromRect({ topLeft: { x: 1, y: 2 }, bottomRight: { x: 3, y: 4 } })).toEqual(
        new Rectangle(new Vector(1, 2), new Vector(3, 4))
      );
    });
  });

  describe('size: ', () => {
    test('sample 1', () => {
      expect(new Rectangle(new Vector(1, 2), new Vector(3, 4)).size).toEqual(new Vector(2, 2));
    });
  });

  describe('isEqual: ', () => {
    test('sample 1', () => {
      expect(
        new Rectangle(new Vector(1, 2), new Vector(3, 4)).isEqual(new Rectangle(new Vector(1, 2), new Vector(3, 4)))
      ).toEqual(true);
    });

    test('sample 2', () => {
      expect(
        new Rectangle(new Vector(1, 2), new Vector(3, 4)).isEqual(new Rectangle(new Vector(1, 2), new Vector(3, 5)))
      ).toEqual(false);
    });

    test('sample 3', () => {
      expect(
        new Rectangle(new Vector(1, 2), new Vector(3, 4)).isEqual(new Rectangle(new Vector(1, 2), new Vector(4, 4)))
      ).toEqual(false);
    });

    test('sample 4', () => {
      expect(
        new Rectangle(new Vector(1, 2), new Vector(3, 4)).isEqual(new Rectangle(new Vector(1, 3), new Vector(3, 4)))
      ).toEqual(false);
    });
  });

  describe('isValid: ', () => {
    test('sample 1', () => {
      expect(new Rectangle(new Vector(1, 2), new Vector(3, 4)).isValid()).toEqual(true);
    });

    test('sample 2', () => {
      expect(new Rectangle(new Vector(1, 2), new Vector(1, 4)).isValid()).toEqual(true);
    });

    test('sample 3', () => {
      expect(new Rectangle(new Vector(1, 2), new Vector(3, 2)).isValid()).toEqual(true);
    });

    test('sample 4', () => {
      expect(new Rectangle(new Vector(3, 4), new Vector(1, 2)).isValid()).toEqual(false);
    });
  });
});
