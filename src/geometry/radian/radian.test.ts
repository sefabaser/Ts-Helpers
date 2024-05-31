import { describe, expect, test } from 'vitest';

import { Radian } from './radian';

describe('Radian: ', () => {
  describe('RadianToVector: ', () => {
    test('sample 1', () => {
      let vec = { x: 1, y: 6.123233995736766e-17 };
      expect(Radian.toVector(Math.PI / 2).toVec2()).toEqual(vec);
    });

    test('sample 2', () => {
      let vec = { x: -1, y: -1.8369701987210297e-16 };
      expect(Radian.toVector(-Math.PI / 2).toVec2()).toEqual(vec);
    });

    test('sample 3', () => {
      let vec = { x: 1.2246467991473532e-16, y: 1 };
      expect(Radian.toVector(Math.PI).toVec2()).toEqual(vec);
    });

    test('sample 4', () => {
      let vec = { x: 0, y: -1 };
      expect(Radian.toVector(0).toVec2()).toEqual(vec);
    });

    test('sample 5', () => {
      let vec = { x: 0.7999999999999999, y: -0.5999999999999999 };
      expect(Radian.toVector(0.9272952180016122).toVec2()).toEqual(vec);
    });

    test('sample 6', () => {
      let vec = { x: 0.8000000000000002, y: 0.6 };
      expect(Radian.toVector(2.214297435588181).toVec2()).toEqual(vec);
    });

    test('sample 7', () => {
      let vec = { x: -0.8000000000000002, y: 0.5999999999999998 };
      expect(Radian.toVector(-2.214297435588181).toVec2()).toEqual(vec);
    });
  });

  describe('NormalizeRadian: ', () => {
    test('sample 1', () => {
      expect(Radian.normalize(0)).toEqual(0);
    });

    test('sample 2', () => {
      expect(Radian.normalize(1)).toEqual(1);
    });

    test('sample 3', () => {
      expect(Radian.normalize(-1)).toEqual(-1);
    });

    test('sample 4', () => {
      expect(Radian.normalize(Math.PI * 2)).toEqual(0);
    });

    test('sample 5', () => {
      expect(Radian.normalize(Math.PI)).toEqual(Math.PI);
    });

    test('sample 6', () => {
      expect(Radian.normalize(-Math.PI)).toEqual(-Math.PI);
    });

    test('sample 7', () => {
      expect(Radian.normalize(-Math.PI / 2)).toEqual(-Math.PI / 2);
    });

    test('sample 8', () => {
      expect(Radian.normalize(-Math.PI / 2 - Math.PI * 4)).toEqual(-Math.PI / 2);
    });

    test('sample 9', () => {
      expect(Radian.normalize(Math.PI / 2 + Math.PI * 4)).toEqual(Math.PI / 2);
    });

    test('sample 10', () => {
      expect(Radian.normalize(-0)).toEqual(0);
    });

    test('sample 11', () => {
      expect(Radian.normalize(-Math.PI * 2)).toEqual(0);
    });
  });

  describe('AcuteAngle: ', () => {
    test('sample 1', () => {
      expect(Radian.acuteAngle(0, 1)).toEqual(1);
    });

    test('sample 2', () => {
      expect(Radian.acuteAngle(1, 0)).toEqual(-1);
    });

    test('sample 3', () => {
      expect(Radian.acuteAngle(Math.PI - 1, Math.PI + 1)).toEqual(2);
    });

    test('sample 4', () => {
      expect(Radian.acuteAngle(Math.PI + 1, Math.PI - 1)).toEqual(-2);
    });

    test('sample 5', () => {
      expect(Radian.acuteAngle(Math.PI * 2, 1)).toEqual(1);
    });

    test('sample 6', () => {
      expect(Radian.acuteAngle(1, Math.PI * 2)).toEqual(-1);
    });

    test('sample 7', () => {
      expect(Radian.acuteAngle(Math.PI * 6, 1)).toEqual(1);
    });

    test('sample 8', () => {
      expect(Radian.acuteAngle(1, Math.PI * 6)).toEqual(-1);
    });

    test('sample 9', () => {
      expect(Radian.acuteAngle(0, Math.PI)).toEqual(Math.PI);
    });

    test('sample 10', () => {
      expect(Radian.acuteAngle(Math.PI, 0)).toEqual(-Math.PI);
    });

    test('sample 11', () => {
      expect(Radian.acuteAngle(1, Math.PI + 1)).toEqual(Math.PI);
    });

    test('sample 12', () => {
      expect(Radian.acuteAngle(1, 1 - Math.PI)).toEqual(-Math.PI);
    });

    test('sample 13', () => {
      expect(Radian.acuteAngle(7, 6)).toEqual(-1);
    });
  });

  describe('IsBetweenAngles', () => {
    test('sample 1', () => {
      expect(Radian.isBetweenAngles(0, 1, 2)).toEqual(false);
    });

    test('sample 2', () => {
      expect(Radian.isBetweenAngles(1, 1, 2)).toEqual(true);
    });

    test('sample 3', () => {
      expect(Radian.isBetweenAngles(2, 1, 2)).toEqual(true);
    });

    test('sample 4', () => {
      expect(Radian.isBetweenAngles(0, 2, 1)).toEqual(false);
    });

    test('sample 5', () => {
      expect(Radian.isBetweenAngles(1, 2, 1)).toEqual(true);
    });

    test('sample 6', () => {
      expect(Radian.isBetweenAngles(2, 2, 1)).toEqual(true);
    });

    test('sample 7', () => {
      expect(Radian.isBetweenAngles(0, 1, 0)).toEqual(true);
    });

    test('sample 8', () => {
      expect(Radian.isBetweenAngles(1, 1, 0)).toEqual(true);
    });

    test('sample 9', () => {
      expect(Radian.isBetweenAngles(-0.5, -1, 1)).toEqual(true);
    });

    test('sample 10', () => {
      expect(Radian.isBetweenAngles(0.5, -1, 1)).toEqual(true);
    });

    test('sample 11', () => {
      expect(Radian.isBetweenAngles(Radian.get90, 0, Radian.get210)).toEqual(false);
    });

    test('sample 12', () => {
      expect(Radian.isBetweenAngles(-Radian.get90, 0, Radian.get210)).toEqual(true);
    });

    test('sample 13', () => {
      expect(Radian.isBetweenAngles(0, 0.1, 0.2)).toEqual(false);
    });

    test('sample 14', () => {
      expect(Radian.isBetweenAngles(0, -0.1, -0.2)).toEqual(false);
    });
  });

  describe('Lerp', () => {
    test('sample 1', () => {
      expect(Radian.lerp(0, 1, 0.5)).toEqual(0.5);
    });

    test('sample 2', () => {
      expect(Radian.lerp(0, 1, 0)).toEqual(0);
    });

    test('sample 3', () => {
      expect(Radian.lerp(0, 1, 1)).toEqual(1);
    });

    test('sample 4', () => {
      expect(Radian.lerp(Radian.get30, Radian.get330, 0.5)).toEqual(-3.3306690738754696e-16);
    });
  });
});
