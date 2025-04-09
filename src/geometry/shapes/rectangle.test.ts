import { describe, expect, test } from 'vitest';

import { Vector } from '../vector/vector';
import { Rectangle } from './rectangle';

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

  describe('isCovering: ', () => {
    test('complete coverage', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(3, 3));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(2, 2));
      expect(rect1.isCovering(rect2)).toEqual(true);
    });

    test('no coverage', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(1, 1));
      let rect2 = new Rectangle(new Vector(2, 2), new Vector(3, 3));
      expect(rect1.isCovering(rect2)).toEqual(false);
    });

    test('partial coverage', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(3, 3));
      expect(rect1.isCovering(rect2)).toEqual(false);
    });

    test('same rectangle', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(1, 1));
      expect(rect1.isCovering(rect1)).toEqual(true);
    });

    test('larger rectangle', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(3, 3));
      expect(rect2.isCovering(rect1)).toEqual(false);
    });

    test('touching edges', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(2, 0), new Vector(3, 2));
      expect(rect1.isCovering(rect2)).toEqual(false);
    });

    test('overlapping but not covering', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(3, 3));
      expect(rect1.isCovering(rect2)).toEqual(false);
    });

    test('covering with same edges', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(0, 0), new Vector(1, 1));
      expect(rect1.isCovering(rect2)).toEqual(true);
    });
  });

  describe('isOverlapping: ', () => {
    test('overlapping rectangles', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(3, 3));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });

    test('non-overlapping rectangles', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(1, 1));
      let rect2 = new Rectangle(new Vector(2, 2), new Vector(3, 3));
      expect(rect1.isOverlapping(rect2)).toEqual(false);
    });

    test('touching rectangles', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(1, 1));
      let rect2 = new Rectangle(new Vector(1, 0), new Vector(2, 1));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });

    test('contained rectangle', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(3, 3));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(2, 2));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });

    test('same rectangle', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(1, 1));
      expect(rect1.isOverlapping(rect1)).toEqual(true);
    });

    test('overlapping from top-left corner', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(-1, -1), new Vector(1, 1));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });

    test('overlapping from top-right corner', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(1, -1), new Vector(3, 1));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });

    test('overlapping from bottom-left corner', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(-1, 1), new Vector(1, 3));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });

    test('overlapping from bottom-right corner', () => {
      let rect1 = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      let rect2 = new Rectangle(new Vector(1, 1), new Vector(3, 3));
      expect(rect1.isOverlapping(rect2)).toEqual(true);
    });
  });

  describe('isPointInside: ', () => {
    test('point inside rectangle', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 1, y: 1 })).toEqual(true);
    });

    test('point outside rectangle', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 3, y: 3 })).toEqual(false);
    });

    test('point on top-left corner', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 0, y: 0 })).toEqual(true);
    });

    test('point on top-right corner', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 2, y: 0 })).toEqual(true);
    });

    test('point on bottom-left corner', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 0, y: 2 })).toEqual(true);
    });

    test('point on bottom-right corner', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 2, y: 2 })).toEqual(true);
    });

    test('point on top edge', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 1, y: 0 })).toEqual(true);
    });

    test('point on bottom edge', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 1, y: 2 })).toEqual(true);
    });

    test('point on left edge', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 0, y: 1 })).toEqual(true);
    });

    test('point on right edge', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(2, 2));
      expect(rect.isPointInside({ x: 2, y: 1 })).toEqual(true);
    });

    test('point on infinity', () => {
      let rect = new Rectangle(new Vector(0, 0), new Vector(Infinity, Infinity));
      expect(rect.isPointInside({ x: Infinity, y: 1 })).toEqual(true);
    });
  });
});
