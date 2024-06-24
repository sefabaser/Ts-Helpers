import { describe, expect, test } from 'vitest';

import { PI_360, PI_90, Radian } from './radian';

describe('Radian: ', () => {
  describe('GetAverage', () => {
    test('sample 1', () => {
      let radians = [Radian.get0, Radian.get60];
      let expectation = Radian.get30;
      expect(Radian.getAverage(...radians).value - expectation.value).lessThanOrEqual(Number.EPSILON);
    });

    test('sample 2', () => {
      let radians = [Radian.get60, Radian.get0];
      let expectation = Radian.get30;
      expect(Radian.getAverage(...radians).value - expectation.value).lessThanOrEqual(Number.EPSILON);
    });

    test('sample 3', () => {
      let radians = [Radian.get330, Radian.get30];
      let expectation = Radian.get0;
      expect(Radian.getAverage(...radians).value - expectation.value).lessThanOrEqual(Number.EPSILON);
    });

    test('sample 4', () => {
      let radians = [Radian.get330, Radian.get90, Radian.get270];
      let expectation = Radian.get330;
      expect(Radian.getAverage(...radians).value - expectation.value).lessThanOrEqual(Number.EPSILON);
    });
  });

  describe('RadianToVector: ', () => {
    test('sample 1', () => {
      let vec = { x: 1, y: 6.123233995736766e-17 };
      expect(new Radian(Math.PI / 2).vector.toVec2()).toEqual(vec);
    });

    test('sample 2', () => {
      let vec = { x: -1, y: -1.8369701987210297e-16 };
      expect(new Radian(-Math.PI / 2).vector.toVec2()).toEqual(vec);
    });

    test('sample 3', () => {
      let vec = { x: 1.2246467991473532e-16, y: 1 };
      expect(new Radian(Math.PI).vector.toVec2()).toEqual(vec);
    });

    test('sample 4', () => {
      let vec = { x: 0, y: -1 };
      expect(new Radian(0).vector.toVec2()).toEqual(vec);
    });

    test('sample 5', () => {
      let vec = { x: 0.7999999999999999, y: -0.5999999999999999 };
      expect(new Radian(0.9272952180016122).vector.toVec2()).toEqual(vec);
    });

    test('sample 6', () => {
      let vec = { x: 0.8000000000000002, y: 0.6 };
      expect(new Radian(2.214297435588181).vector.toVec2()).toEqual(vec);
    });

    test('sample 7', () => {
      let vec = { x: -0.8000000000000002, y: 0.5999999999999998 };
      expect(new Radian(-2.214297435588181).vector.toVec2()).toEqual(vec);
    });
  });

  describe('NormalizeRadian: ', () => {
    test('sample 1', () => {
      expect(new Radian(0).value).toEqual(0);
    });

    test('sample 2', () => {
      expect(new Radian(1).value).toEqual(1);
    });

    test('sample 3', () => {
      expect(new Radian(-1).value).toEqual(-1);
    });

    test('sample 4', () => {
      expect(new Radian(Math.PI * 2).value).toEqual(0);
    });

    test('sample 5', () => {
      expect(new Radian(Math.PI).value).toEqual(Math.PI);
    });

    test('sample 6', () => {
      expect(new Radian(-Math.PI).value).toEqual(-Math.PI);
    });

    test('sample 7', () => {
      expect(new Radian(-Math.PI / 2).value).toEqual(-Math.PI / 2);
    });

    test('sample 8', () => {
      expect(new Radian(-Math.PI / 2 - Math.PI * 4).value).toEqual(-Math.PI / 2);
    });

    test('sample 9', () => {
      expect(new Radian(Math.PI / 2 + Math.PI * 4).value).toEqual(Math.PI / 2);
    });

    test('sample 10', () => {
      expect(new Radian(-0).value).toEqual(0);
    });

    test('sample 11', () => {
      expect(new Radian(-Math.PI * 2).value).toEqual(0);
    });

    test('sample 12', () => {
      expect(new Radian(PI_360 - PI_90).value).toEqual(-PI_90);
    });
  });

  describe('AcuteAngle: ', () => {
    test('sample 1', () => {
      let radian1 = 0;
      let radian2 = 1;
      let expectation = 1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 2', () => {
      let radian1 = 1;
      let radian2 = 0;
      let expectation = -1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 3', () => {
      let radian1 = Math.PI - 1;
      let radian2 = Math.PI + 1;
      let expectation = 2;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 4', () => {
      let radian1 = Math.PI + 1;
      let radian2 = Math.PI - 1;
      let expectation = -2;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 5', () => {
      let radian1 = Math.PI * 2;
      let radian2 = 1;
      let expectation = 1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 6', () => {
      let radian1 = 1;
      let radian2 = Math.PI * 2;
      let expectation = -1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 7', () => {
      let radian1 = Math.PI * 6;
      let radian2 = 1;
      let expectation = 1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 8', () => {
      let radian1 = 1;
      let radian2 = Math.PI * 6;
      let expectation = -1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 9', () => {
      let radian1 = 0;
      let radian2 = Math.PI;
      let expectation = Math.PI;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 10', () => {
      let radian1 = Math.PI;
      let radian2 = 0;
      let expectation = -Math.PI;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 11', () => {
      let radian1 = 1;
      let radian2 = Math.PI + 1;
      let expectation = -Math.PI;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 12', () => {
      let radian1 = 1;
      let radian2 = 1 - Math.PI;
      let expectation = -Math.PI;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });

    test('sample 13', () => {
      let radian1 = 7;
      let radian2 = 6;
      let expectation = -1;
      expect(new Radian(radian1).acuteAngle(new Radian(radian2)).value).toEqual(expectation);
    });
  });

  describe('IsBetweenAngles', () => {
    test('sample 1', () => {
      expect(new Radian(0).isBetweenAngles(new Radian(1), new Radian(2))).toEqual(false);
    });

    test('sample 2', () => {
      expect(new Radian(1).isBetweenAngles(new Radian(1), new Radian(2))).toEqual(true);
    });

    test('sample 3', () => {
      expect(new Radian(2).isBetweenAngles(new Radian(1), new Radian(2))).toEqual(true);
    });

    test('sample 4', () => {
      expect(new Radian(0).isBetweenAngles(new Radian(2), new Radian(1))).toEqual(false);
    });

    test('sample 5', () => {
      expect(new Radian(1).isBetweenAngles(new Radian(2), new Radian(1))).toEqual(true);
    });

    test('sample 6', () => {
      expect(new Radian(2).isBetweenAngles(new Radian(2), new Radian(1))).toEqual(true);
    });

    test('sample 7', () => {
      expect(new Radian(0).isBetweenAngles(new Radian(1), new Radian(0))).toEqual(true);
    });

    test('sample 8', () => {
      expect(new Radian(1).isBetweenAngles(new Radian(1), new Radian(0))).toEqual(true);
    });

    test('sample 9', () => {
      expect(new Radian(-0.5).isBetweenAngles(new Radian(-1), new Radian(1))).toEqual(true);
    });

    test('sample 10', () => {
      expect(new Radian(0.5).isBetweenAngles(new Radian(-1), new Radian(1))).toEqual(true);
    });

    test('sample 11', () => {
      expect(new Radian(PI_90).isBetweenAngles(new Radian(0), Radian.get210)).toEqual(false);
    });

    test('sample 12', () => {
      expect(new Radian(-PI_90).isBetweenAngles(new Radian(0), Radian.get210)).toEqual(true);
    });

    test('sample 13', () => {
      expect(new Radian(0).isBetweenAngles(new Radian(0.1), new Radian(0.2))).toEqual(false);
    });

    test('sample 14', () => {
      expect(new Radian(0).isBetweenAngles(new Radian(-0.1), new Radian(-0.2))).toEqual(false);
    });
  });

  describe('Lerp', () => {
    test('sample 1', () => {
      expect(new Radian(0).lerp(new Radian(1), 0.5).value).toEqual(0.5);
    });

    test('sample 2', () => {
      expect(new Radian(0).lerp(new Radian(1), 0).value).toEqual(0);
    });

    test('sample 3', () => {
      expect(new Radian(0).lerp(new Radian(1), 1).value).toEqual(1);
    });

    test('sample 4', () => {
      expect(Radian.get30.lerp(Radian.get330, 0.5).value).toEqual(0);
    });
  });

  describe('Cache: ', () => {
    test('random', () => {
      let radian = Radian.random();
      expect(radian['cache'].alreadyNormalized).toBe(true);
    });

    test('abs', () => {
      let radian = new Radian(PI_360);
      expect(radian.abs()['cache'].alreadyNormalized).toBe(true);
    });

    test('acuteAngle 1', () => {
      let radian = new Radian(PI_360).acuteAngle(Radian.get30);
      expect(radian['cache'].alreadyNormalized).toBe(true);
      expect(radian.value).toEqual(Radian.get30.value);
    });

    test('acuteAngle 2', () => {
      let radian = new Radian(PI_360).acuteAngle(Radian.get330);
      expect(radian['cache'].alreadyNormalized).toBe(true);
      expect(radian.value).toEqual(-Radian.get30.value);
    });

    test('getVector', () => {
      let vector = new Radian(PI_360).vector;
      expect(vector['cache'].length).toStrictEqual(1);
      expect(vector['getLength']()).toStrictEqual(1);

      expect(vector['cache'].radian?.value).toStrictEqual(0);
      expect(vector['getRadian']().value).toStrictEqual(0);
    });
  });

  describe('Clamp: ', () => {
    test('sample 1', () => {
      expect(new Radian(0).clamp(Radian.get330, Radian.get30).value).toEqual(0);
    });

    test('sample 2', () => {
      expect(new Radian(PI_360).clamp(Radian.get330, Radian.get30).value).toEqual(0);
    });

    test('sample 3', () => {
      expect(new Radian(PI_360 + 1).clamp(Radian.get330, Radian.get30).value).toEqual(Radian.get30.value);
    });

    test('sample 4', () => {
      expect(new Radian(-1).clamp(Radian.get330, Radian.get30).value).toEqual(Radian.get330.value);
    });

    test('sample 5', () => {
      expect(new Radian(-PI_360).clamp(Radian.get330, Radian.get30).value).toEqual(0);
    });

    test('sample 6', () => {
      expect(new Radian(-PI_360 - 1).clamp(Radian.get30, Radian.get330).value).toEqual(Radian.get330.value);
    });
  });

  describe('NoLowerThan: ', () => {
    test('sample 1', () => {
      expect(new Radian(0).noLowerThan(Radian.get30).value).toEqual(Radian.get30.value);
    });

    test('sample 2', () => {
      expect(new Radian(PI_360).noLowerThan(Radian.get30).value).toEqual(Radian.get30.value);
    });

    test('sample 3', () => {
      expect(new Radian(-1).noLowerThan(Radian.get30).value).toEqual(Radian.get30.value);
    });

    test('sample 4', () => {
      expect(new Radian(-PI_360).noLowerThan(Radian.get30).value).toEqual(Radian.get30.value);
    });
  });

  describe('NoHigherThan: ', () => {
    test('sample 1', () => {
      expect(new Radian(0).noHigherThan(Radian.get30).value).toEqual(0);
    });

    test('sample 2', () => {
      expect(new Radian(PI_360).noHigherThan(Radian.get30).value).toEqual(0);
    });

    test('sample 3', () => {
      expect(new Radian(-1).noHigherThan(Radian.get30).value).toEqual(-1);
    });

    test('sample 4', () => {
      expect(new Radian(-PI_360).noHigherThan(Radian.get30).value).toEqual(0);
    });
  });
});
