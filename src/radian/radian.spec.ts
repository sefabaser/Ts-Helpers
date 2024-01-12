import { Radian } from './radian';

describe('Radian: ', () => {
  describe('VectorToRadian: ', () => {
    it('sample 1', () => {
      let vec = { x: 1, y: 0 };
      expect(Radian.vectorToRadian(vec)).toEqual(Math.PI / 2);
    });

    it('sample 2', () => {
      let vec = { x: -1, y: 0 };
      expect(Radian.vectorToRadian(vec)).toEqual(-Math.PI / 2);
    });

    it('sample 3', () => {
      let vec = { x: 0, y: 1 };
      expect(Radian.vectorToRadian(vec)).toEqual(Math.PI);
    });

    it('sample 4', () => {
      let vec = { x: 0, y: -1 };
      expect(Radian.vectorToRadian(vec)).toEqual(0);
    });

    it('sample 5', () => {
      let vec = { x: 4, y: -3 };
      expect(Radian.vectorToRadian(vec)).toEqual(0.9272952180016122);
    });

    it('sample 6', () => {
      let vec = { x: 4, y: 3 };
      expect(Radian.vectorToRadian(vec)).toEqual(2.214297435588181);
    });

    it('sample 7', () => {
      let vec = { x: -4, y: 3 };
      expect(Radian.vectorToRadian(vec)).toEqual(-2.214297435588181);
    });
  });

  describe('RadianToVector: ', () => {
    it('sample 1', () => {
      let vec = { x: 1, y: 0 };
      expect(Radian.radianToVector(Math.PI / 2)).toEqual(vec);
    });

    it('sample 2', () => {
      let vec = { x: -1, y: 0 };
      expect(Radian.radianToVector(-Math.PI / 2)).toEqual(vec);
    });

    it('sample 3', () => {
      let vec = { x: 0, y: 1 };
      expect(Radian.radianToVector(Math.PI)).toEqual(vec);
    });

    it('sample 4', () => {
      let vec = { x: 0, y: -1 };
      expect(Radian.radianToVector(0)).toEqual(vec);
    });

    it('sample 5', () => {
      let vec = { x: 0.8, y: -0.6 };
      expect(Radian.radianToVector(0.9272952180016122)).toEqual(vec);
    });

    it('sample 6', () => {
      let vec = { x: 0.8, y: 0.6 };
      expect(Radian.radianToVector(2.214297435588181)).toEqual(vec);
    });

    it('sample 7', () => {
      let vec = { x: -0.8, y: 0.6 };
      expect(Radian.radianToVector(-2.214297435588181)).toEqual(vec);
    });
  });

  describe('NormalizeRadian: ', () => {
    it('sample 1', () => {
      expect(Radian.normalize(0)).toEqual(0);
    });

    it('sample 2', () => {
      expect(Radian.normalize(1)).toEqual(1);
    });

    it('sample 3', () => {
      expect(Radian.normalize(-1)).toEqual(-1);
    });

    it('sample 4', () => {
      expect(Radian.normalize(Math.PI * 2)).toEqual(0);
    });

    it('sample 5', () => {
      expect(Radian.normalize(Math.PI)).toEqual(Math.PI);
    });

    it('sample 6', () => {
      expect(Radian.normalize(-Math.PI)).toEqual(-Math.PI);
    });

    it('sample 7', () => {
      expect(Radian.normalize(-Math.PI / 2)).toEqual(-Math.PI / 2);
    });

    it('sample 8', () => {
      expect(Radian.normalize(-Math.PI / 2 - Math.PI * 4)).toEqual(-Math.PI / 2);
    });

    it('sample 9', () => {
      expect(Radian.normalize(Math.PI / 2 + Math.PI * 4)).toEqual(Math.PI / 2);
    });

    it('sample 10', () => {
      expect(Radian.normalize(-0)).toEqual(0);
    });

    it('sample 11', () => {
      expect(Radian.normalize(-Math.PI * 2)).toEqual(0);
    });
  });

  describe('AcuteAngle: ', () => {
    it('sample 1', () => {
      expect(Radian.acuteAngle(0, 1)).toEqual(1);
    });

    it('sample 2', () => {
      expect(Radian.acuteAngle(1, 0)).toEqual(-1);
    });

    it('sample 3', () => {
      expect(Radian.acuteAngle(Math.PI - 1, Math.PI + 1)).toEqual(2);
    });

    it('sample 4', () => {
      expect(Radian.acuteAngle(Math.PI + 1, Math.PI - 1)).toEqual(-2);
    });

    it('sample 5', () => {
      expect(Radian.acuteAngle(Math.PI * 2, 1)).toEqual(1);
    });

    it('sample 6', () => {
      expect(Radian.acuteAngle(1, Math.PI * 2)).toEqual(-1);
    });

    it('sample 7', () => {
      expect(Radian.acuteAngle(Math.PI * 6, 1)).toEqual(1);
    });

    it('sample 8', () => {
      expect(Radian.acuteAngle(1, Math.PI * 6)).toEqual(-1);
    });

    it('sample 9', () => {
      expect(Radian.acuteAngle(0, Math.PI)).toEqual(Math.PI);
    });

    it('sample 10', () => {
      expect(Radian.acuteAngle(Math.PI, 0)).toEqual(-Math.PI);
    });

    it('sample 11', () => {
      expect(Radian.acuteAngle(1, Math.PI + 1)).toEqual(Math.PI);
    });

    it('sample 12', () => {
      expect(Radian.acuteAngle(1, 1 - Math.PI)).toEqual(-Math.PI);
    });

    it('sample 13', () => {
      expect(Radian.acuteAngle(7, 6)).toEqual(-1);
    });
  });
});
