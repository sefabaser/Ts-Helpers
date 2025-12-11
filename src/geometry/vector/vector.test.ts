import { describe, expect, test } from 'vitest';

import { PI_90, PI_180, Radian } from '../radian/radian';
import { Rectangle } from '../shapes/rectangle';
import { Vector } from './vector';

describe('Vector: ', () => {
  describe('IsEqual: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.isEqual(vec2)).toEqual(true);
    });

    test('sample 2', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.isEqual(vec2)).toEqual(false);
    });

    test('sample 3', () => {
      let vec1 = new Vector(0, 0);
      expect(vec1.isEqual(undefined)).toEqual(false);
    });

    test('sample 4', () => {
      let vec2 = new Vector(1, 1);
      expect(Vector.isEqual(undefined, vec2)).toEqual(false);
    });

    test('sample 5', () => {
      expect(Vector.isEqual(undefined, undefined)).toEqual(false);
    });
  });

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

  describe('isInside: ', () => {
    test('sample 1', () => {
      let vector = new Vector(0, 0);
      let rectangle = Rectangle.fromRect({ topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } });
      expect(vector.isInsideRectangle(rectangle)).toEqual(true);
    });

    test('sample 2', () => {
      let vector = new Vector(1, 1);
      let rectangle = Rectangle.fromRect({ topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } });
      expect(vector.isInsideRectangle(rectangle)).toEqual(true);
    });

    test('sample 3', () => {
      let vector = new Vector(1, 1);
      let rectangle = Rectangle.fromRect({ topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } });
      expect(vector.isInsideRectangle(rectangle)).toEqual(false);
    });
  });

  describe('Add: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.add(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.add(vec2).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.add(vec2).toVec2()).toEqual({ x: 2, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(3, 0);
      expect(vec1.add(vec2).toVec2()).toEqual({ x: 4, y: 1 });
    });

    test('sample 5', () => {
      let vec1 = new Vector(1, 2);
      let vec2 = new Vector(4, 3);
      expect(vec1.add(vec2).toVec2()).toEqual({ x: 5, y: 5 });
    });
  });

  describe('Subtract: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec2.subtract(vec1).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(0, 0);
      expect(vec2.subtract(vec1).toVec2()).toEqual({ x: -1, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(1, 0);
      expect(vec2.subtract(vec1).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(3, 0);
      expect(vec2.subtract(vec1).toVec2()).toEqual({ x: 2, y: -1 });
    });

    test('sample 5', () => {
      let vec1 = new Vector(1, 2);
      let vec2 = new Vector(4, 3);
      expect(vec2.subtract(vec1).toVec2()).toEqual({ x: 3, y: 1 });
    });
  });

  describe('FromTo: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.to(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.to(vec2).toVec2()).toEqual({ x: -1, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.to(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(3, 0);
      expect(vec1.to(vec2).toVec2()).toEqual({ x: 2, y: -1 });
    });

    test('sample 5', () => {
      let vec1 = new Vector(1, 2);
      let vec2 = new Vector(4, 3);
      expect(vec1.to(vec2).toVec2()).toEqual({ x: 3, y: 1 });
    });
  });

  describe('Multiply: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.multiply(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(2, 2);
      let vec2 = new Vector(4, 3);
      expect(vec1.multiply(vec2).toVec2()).toEqual({ x: 8, y: 6 });
    });
  });

  describe('Multiply Number: ', () => {
    test('sample 1', () => {
      let vec = new Vector(0, 0);
      expect(vec.multiplyNumber(1).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = new Vector(1, 0);
      expect(vec.multiplyNumber(1).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = new Vector(1, 0);
      expect(vec.multiplyNumber(2).toVec2()).toEqual({ x: 2, y: 0 });
    });

    test('sample 4', () => {
      let vec = new Vector(1, 1);
      expect(vec.multiplyNumber(2).toVec2()).toEqual({ x: 2, y: 2 });
    });

    test('sample 5', () => {
      let vec = new Vector(1, 2);
      expect(vec.multiplyNumber(2).toVec2()).toEqual({ x: 2, y: 4 });
    });
  });

  describe('Divide: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 1);
      expect(vec1.divide(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(2, 2);
      let vec2 = new Vector(4, 3);
      expect(vec1.divide(vec2).toVec2()).toEqual({ x: 2 / 4, y: 2 / 3 });
    });
  });

  describe('Divide Number: ', () => {
    test('sample 1', () => {
      let vec = new Vector(0, 0);
      expect(vec.divideNumber(1).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = new Vector(1, 0);
      expect(vec.divideNumber(1).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = new Vector(1, 0);
      expect(vec.divideNumber(2).toVec2()).toEqual({ x: 0.5, y: 0 });
    });

    test('sample 4', () => {
      let vec = new Vector(1, 1);
      expect(vec.divideNumber(2).toVec2()).toEqual({ x: 0.5, y: 0.5 });
    });

    test('sample 5', () => {
      let vec = new Vector(1, 2);
      expect(vec.divideNumber(2).toVec2()).toEqual({ x: 0.5, y: 1 });
    });
  });

  describe('Round: ', () => {
    test('sample 1', () => {
      let vec = new Vector(0, 0);
      expect(vec.round().toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = new Vector(1, 0);
      expect(vec.round().toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = new Vector(1.2, 0);
      expect(vec.round().toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec = new Vector(1.5, 0);
      expect(vec.round().toVec2()).toEqual({ x: 2, y: 0 });
    });

    test('sample 5', () => {
      let vec = new Vector(1.6, -1.1);
      expect(vec.round().toVec2()).toEqual({ x: 2, y: -1 });
    });

    test('sample 6', () => {
      let vec = new Vector(1.5, -1.5);
      expect(vec.round({ rollHalfsDown: true }).toVec2()).toEqual({ x: 1, y: -2 });
    });

    test('sample 7', () => {
      let vec = new Vector(1.51, -1.49);
      expect(vec.round({ rollHalfsDown: true }).toVec2()).toEqual({ x: 2, y: -1 });
    });
  });

  describe('Floor: ', () => {
    test('sample 1', () => {
      let vec = new Vector(1.6, -1.1);
      expect(vec.floor().toVec2()).toEqual({ x: 1, y: -2 });
    });
  });

  describe('Ceil: ', () => {
    test('sample 1', () => {
      let vec = new Vector(1.6, -1.1);
      expect(vec.ceil().toVec2()).toEqual({ x: 2, y: -1 });
    });
  });

  describe('Rotate: ', () => {
    test('basic rotation 1', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(0, -1);
      expect(vec1.rotate(vec2, false).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('basic rotation 2', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(-1, 0);
      expect(vec1.rotate(vec2, false).toVec2()).toEqual({ x: 0, y: -1 });
    });

    test('rotation with normalization', () => {
      let vec1 = new Vector(3, 0);
      let vec2 = new Vector(-2, 0);
      expect(vec1.rotate(vec2).toVec2()).toEqual({ x: 0, y: -3 });
    });

    test('complex rotation with normalization 1', () => {
      let vec1 = new Vector(4, -3);
      let vec2 = new Vector(-3, -4);
      expect(vec1.rotate(vec2).toVec2()).toEqual({ x: 1.4000000000000004, y: -4.800000000000001 });
    });

    test('complex rotation with normalization 2', () => {
      let vec1 = new Vector(3, 2);
      let vec2 = new Vector(-3, 1);
      expect(vec1.rotate(vec2).toVec2()).toEqual({ x: 0.9486832980505138, y: -3.478505426185217 });
    });
  });

  describe('Normalize: ', () => {
    test('sample 1', () => {
      let vec = new Vector(1, 0);
      expect(vec.normalize().toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 2', () => {
      let vec = new Vector(0, 1);
      expect(vec.normalize().toVec2()).toEqual({ x: 0, y: 1 });
    });

    test('sample 3', () => {
      let vec = new Vector(3, 4);
      expect(vec.normalize().toVec2()).toEqual({ x: 0.6, y: 0.8 });
    });

    test('sample 4', () => {
      let vec = new Vector(0.3, 0.4);
      expect(vec.normalize().toVec2()).toEqual({ x: 0.6, y: 0.8 });
    });

    test('sample 5', () => {
      let vec = new Vector(0, 0);
      expect(vec.normalize().toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 6', () => {
      let vec = new Vector(3, 4);
      expect(vec.normalize(10).toVec2()).toEqual({ x: 6, y: 8 });
    });

    test('sample 7', () => {
      let vec = new Vector(3, 4);
      expect(vec.normalize(0).toVec2()).toEqual({ x: 0, y: 0 });
    });
  });

  describe('Projection: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.projection(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 1);
      expect(vec1.projection(vec2).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.projection(vec2).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(3, 0);
      expect(vec1.projection(vec2).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 5', () => {
      let vec1 = new Vector(1, 2);
      let vec2 = new Vector(4, 3);
      expect(vec1.projection(vec2).toVec2()).toEqual({ x: 1.6, y: 1.2000000000000002 });
    });
  });

  describe('GetDotProduct: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.dotProduct(vec2)).toEqual(0);
    });

    test('sample 2', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.dotProduct(vec2)).toEqual(0);
    });

    test('sample 3', () => {
      let vec1 = new Vector(1, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.dotProduct(vec2)).toEqual(1);
    });

    test('sample 4', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(1, 0);
      expect(vec1.dotProduct(vec2)).toEqual(1);
    });

    test('sample 5', () => {
      let vec1 = new Vector(1, 2);
      let vec2 = new Vector(4, 3);
      expect(vec1.dotProduct(vec2)).toEqual(10);
    });
  });

  describe('GetDistance: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.getDistance(vec2)).toEqual(0);
    });

    test('sample 2', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.getDistance(vec2)).toEqual(1);
    });

    test('sample 3', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 1);
      expect(vec1.getDistance(vec2)).toEqual(1);
    });

    test('sample 4', () => {
      let vec1 = new Vector(3, 0);
      let vec2 = new Vector(0, 4);
      expect(vec1.getDistance(vec2)).toEqual(5);
    });
  });

  describe('GetLength: ', () => {
    test('sample 1', () => {
      let vec = new Vector(0, 0);
      expect(vec.length).toEqual(0);
    });

    test('sample 2', () => {
      let vec = new Vector(1, 0);
      expect(vec.length).toEqual(1);
    });

    test('sample 3', () => {
      let vec = new Vector(0, 1);
      expect(vec.length).toEqual(1);
    });

    test('sample 4', () => {
      let vec = new Vector(3, 4);
      expect(vec.length).toEqual(5);
    });
  });

  describe('EnsureMaxLength: ', () => {
    test('sample 1', () => {
      let vec = new Vector(0, 0);
      expect(vec.ensureMaxLength(1).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec = new Vector(1, 0);
      expect(vec.ensureMaxLength(1).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 3', () => {
      let vec = new Vector(1, 0);
      expect(vec.ensureMaxLength(2).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec = new Vector(1, 1);
      expect(vec.ensureMaxLength(2).toVec2()).toEqual({ x: 1, y: 1 });
    });

    test('sample 5', () => {
      let vec = new Vector(6, 8);
      expect(vec.ensureMaxLength(5).toVec2()).toEqual({ x: 3, y: 4 });
    });
  });

  describe('Lerp: ', () => {
    test('sample 1', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(0, 0);
      expect(vec1.lerp(vec2, 0).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 2', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.lerp(vec2, 0).toVec2()).toEqual({ x: 0, y: 0 });
    });

    test('sample 3', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.lerp(vec2, 1).toVec2()).toEqual({ x: 1, y: 0 });
    });

    test('sample 4', () => {
      let vec1 = new Vector(0, 0);
      let vec2 = new Vector(1, 0);
      expect(vec1.lerp(vec2, 0.5).toVec2()).toEqual({ x: 0.5, y: 0 });
    });

    test('sample 5', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(4, 3);
      expect(vec1.lerp(vec2, 0.5).toVec2()).toEqual({ x: 2.5, y: 2 });
    });

    test('sample 6', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(4, 3);
      expect(vec1.lerp(vec2, 0.75).toVec2()).toEqual({ x: 3.25, y: 2.5 });
    });
  });

  describe('ToRadian: ', () => {
    test('sample 1', () => {
      let vec = new Vector(1, 0);
      expect(vec.radian.value).toEqual(PI_90);
    });

    test('sample 2', () => {
      let vec = new Vector(-1, 0);
      expect(vec.radian.value).toEqual(-PI_90);
    });

    test('sample 3', () => {
      let vec = new Vector(0, 1);
      expect(vec.radian.value).toEqual(PI_180);
    });

    test('sample 4', () => {
      let vec = new Vector(0, 2);
      expect(vec.radian.value).toEqual(PI_180);
    });

    test('sample 5', () => {
      let vec = new Vector(0, -1);
      expect(vec.radian.value).toEqual(0);
    });

    test('sample 6', () => {
      let vec = new Vector(4, -3);
      expect(vec.radian.value).toEqual(0.9272952180016122);
    });

    test('sample 7', () => {
      let vec = new Vector(4, 3);
      expect(vec.radian.value).toEqual(2.214297435588181);
    });

    test('sample 8', () => {
      let vec = new Vector(-4, 3);
      expect(vec.radian.value).toEqual(-2.214297435588181);
    });

    test('sample 9', () => {
      let vec = new Vector(0, 0);
      expect(vec.radian.value).toEqual(PI_90);
    });
  });

  describe('Cache: ', () => {
    test('random', () => {
      let vec = Vector.random(2);

      expect((vec['_cache'].length ?? 0) - 2).toBeLessThanOrEqual(Number.EPSILON * 2);
      expect(vec['_getLength']() - 2).toBeLessThanOrEqual(Number.EPSILON * 2);

      expect(vec['_getRadian']().acuteAngle(vec['_cache'].radian ?? Radian.get0).value).toBeLessThanOrEqual(Number.EPSILON);
    });

    test('multiply number', () => {
      let vec = new Vector(3, 4);
      let radian = vec.radian;
      vec.multiplyNumber(2);

      expect(vec['_cache'].radian).toStrictEqual(radian);
      expect(vec['_getRadian']()).toStrictEqual(radian);
    });

    test('divide number', () => {
      let vec = new Vector(3, 4);
      let radian = vec.radian;
      vec.divideNumber(2);

      expect(vec['_cache'].radian).toStrictEqual(radian);
      expect(vec['_getRadian']()).toStrictEqual(radian);
    });

    test('normalize', () => {
      let vec = new Vector(3, 4);
      let radian = vec.radian;
      let result = vec.normalize(2);

      expect(result['_cache'].length).toStrictEqual(2);
      expect(result['_getLength']()).toStrictEqual(2);

      expect(result['_cache'].radian).toStrictEqual(radian);
      expect(result['_getRadian']()['_value']).toStrictEqual(radian['_value']);
    });

    test('projection', () => {
      let vec1 = new Vector(1, 1);
      let vec2 = new Vector(3, 0);
      let radian = vec2.radian;
      let result = vec1.projection(vec2);

      expect(result['_cache'].radian).toStrictEqual(radian);
      expect(result['_getRadian']()['_value']).toStrictEqual(radian['_value']);
    });

    test('ensureMaxLength - bigger than max length', () => {
      let vec = new Vector(6, 8);
      let radian = vec.radian;
      let result = vec.ensureMaxLength(5);

      expect(result['_cache'].radian).toStrictEqual(radian);
      expect(result['_getRadian']()['_value']).toStrictEqual(radian['_value']);
    });

    test('ensureMaxLength - smaller than max length', () => {
      let vec = new Vector(3, 4);
      let radian = vec.radian;
      let result = vec.ensureMaxLength(10);

      expect(result['_cache'].radian).toStrictEqual(radian);
      expect(result['_getRadian']()['_value']).toStrictEqual(radian['_value']);
    });
  });
});
