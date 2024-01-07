import { Vector } from './vector';

describe('Vector', () => {
  describe('GetRadian', () => {
    it('sample 1', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.getRadian(vec)).toEqual(Math.PI / 2);
    });

    it('sample 2', () => {
      let vec = { x: -1, y: 0 };
      expect(Vector.getRadian(vec)).toEqual((3 * Math.PI) / 2);
    });

    it('sample 3', () => {
      let vec = { x: 0, y: 1 };
      expect(Vector.getRadian(vec)).toEqual(0);
    });

    it('sample 4', () => {
      let vec = { x: 0, y: -1 };
      expect(Vector.getRadian(vec)).toEqual(Math.PI);
    });

    it('sample 5', () => {
      let vec = { x: 4, y: -3 };
      expect(Vector.getRadian(vec)).toEqual(2.214297435588181);
    });

    it('sample 6', () => {
      let vec = { x: 4, y: 3 };
      expect(Vector.getRadian(vec)).toEqual(0.9272952180016122);
    });
  });

  describe('NormalizeRadian', () => {
    it('sample 1', () => {
      expect(Vector.normalizeRadian(0)).toEqual(0);
    });

    it('sample 2', () => {
      expect(Vector.normalizeRadian(Math.PI)).toEqual(Math.PI);
    });

    it('sample 3', () => {
      expect(Vector.normalizeRadian(-Math.PI)).toEqual(Math.PI);
    });

    it('sample 4', () => {
      expect(Vector.normalizeRadian(-Math.PI / 2)).toEqual((3 * Math.PI) / 2);
    });

    it('sample 5', () => {
      expect(Vector.normalizeRadian(-Math.PI * 7)).toEqual(Math.PI);
    });

    it('sample 6', () => {
      expect(Vector.normalizeRadian(Math.PI * 7)).toEqual(Math.PI);
    });
  });

  describe('GetAcuteAngle', () => {
    it('sample 1', () => {
      expect(Vector.acuteAngle(0, 1)).toEqual(1);
    });

    it('sample 2', () => {
      expect(Vector.acuteAngle(1, 0)).toEqual(-1);
    });

    it('sample 3', () => {
      expect(Vector.acuteAngle(Math.PI - 1, Math.PI + 1)).toEqual(2);
    });

    it('sample 4', () => {
      expect(Vector.acuteAngle(Math.PI + 1, Math.PI - 1)).toEqual(-2);
    });

    it('sample 5', () => {
      expect(Vector.acuteAngle(Math.PI * 2, 1)).toEqual(1);
    });

    it('sample 6', () => {
      expect(Vector.acuteAngle(1, Math.PI * 2)).toEqual(-1);
    });

    it('sample 7', () => {
      expect(Vector.acuteAngle(Math.PI * 6, 1)).toEqual(1);
    });

    it('sample 8', () => {
      expect(Vector.acuteAngle(1, Math.PI * 6)).toEqual(-1);
    });

    it('sample 9', () => {
      expect(Vector.acuteAngle(0, Math.PI)).toEqual(Math.PI);
    });

    it('sample 10', () => {
      expect(Vector.acuteAngle(Math.PI, 0)).toEqual(-Math.PI);
    });

    it('sample 11', () => {
      expect(Vector.acuteAngle(1, Math.PI + 1)).toEqual(Math.PI);
    });

    it('sample 12', () => {
      expect(Vector.acuteAngle(1, 1 - Math.PI)).toEqual(-Math.PI);
    });

    it('sample 13', () => {
      expect(Vector.acuteAngle(7, 6)).toEqual(-1);
    });
  });
});
