import { Radian } from './radian';

describe('Radian: ', () => {
  describe('ToVector: ', () => {
    // TODO
  });

  describe('FromVector: ', () => {
    it('sample 1', () => {
      let vec = { x: 1, y: 0 };
      expect(Radian.fromVector(vec).radian).toEqual(Math.PI / 2);
    });

    it('sample 2', () => {
      let vec = { x: -1, y: 0 };
      expect(Radian.fromVector(vec).radian).toEqual(-Math.PI / 2);
    });

    it('sample 3', () => {
      let vec = { x: 0, y: 1 };
      expect(Radian.fromVector(vec).radian).toEqual(0);
    });

    it('sample 4', () => {
      let vec = { x: 0, y: -1 };
      expect(Radian.fromVector(vec).radian).toEqual(Math.PI);
    });

    it('sample 5', () => {
      let vec = { x: 4, y: -3 };
      expect(Radian.fromVector(vec).radian).toEqual(2.214297435588181);
    });

    it('sample 6', () => {
      let vec = { x: 4, y: 3 };
      expect(Radian.fromVector(vec).radian).toEqual(0.9272952180016122);
    });
  });

  describe('NormalizeRadian: ', () => {
    it('sample 1', () => {
      expect(new Radian(0).normalize().radian).toEqual(0);
    });

    it('sample 2', () => {
      expect(new Radian(1).radian).toEqual(1);
    });

    it('sample 3', () => {
      expect(new Radian(-1).radian).toEqual(-1);
    });

    it('sample 4', () => {
      expect(new Radian(Math.PI * 2).radian).toEqual(0);
    });

    it('sample 5', () => {
      expect(new Radian(Math.PI).radian).toEqual(Math.PI);
    });

    it('sample 6', () => {
      expect(new Radian(-Math.PI).radian).toEqual(-Math.PI);
    });

    it('sample 7', () => {
      expect(new Radian(-Math.PI / 2).radian).toEqual(-Math.PI / 2);
    });

    it('sample 8', () => {
      expect(new Radian(-Math.PI / 2 - Math.PI * 4).radian).toEqual(-Math.PI / 2);
    });

    it('sample 9', () => {
      expect(new Radian(Math.PI / 2 + Math.PI * 4).radian).toEqual(Math.PI / 2);
    });

    it('sample 10', () => {
      expect(new Radian(-0).radian).toEqual(0);
    });

    it('sample 11', () => {
      expect(new Radian(-Math.PI * 2).radian).toEqual(0);
    });
  });

  describe('AcuteAngle: ', () => {
    it('sample 1', () => {
      expect(new Radian(0).acuteAngle(new Radian(1)).radian).toEqual(1);
    });

    it('sample 2', () => {
      expect(new Radian(1).acuteAngle(new Radian(0)).radian).toEqual(-1);
    });

    it('sample 3', () => {
      expect(new Radian(Math.PI - 1).acuteAngle(new Radian(Math.PI + 1)).radian).toEqual(2);
    });

    it('sample 4', () => {
      expect(new Radian(Math.PI + 1).acuteAngle(new Radian(Math.PI - 1)).radian).toEqual(-2);
    });

    it('sample 5', () => {
      expect(new Radian(Math.PI * 2).acuteAngle(new Radian(1)).radian).toEqual(1);
    });

    it('sample 6', () => {
      expect(new Radian(1).acuteAngle(new Radian(Math.PI * 2)).radian).toEqual(-1);
    });

    it('sample 7', () => {
      expect(new Radian(Math.PI * 6).acuteAngle(new Radian(1)).radian).toEqual(1);
    });

    it('sample 8', () => {
      expect(new Radian(1).acuteAngle(new Radian(Math.PI * 6)).radian).toEqual(-1);
    });

    it('sample 9', () => {
      expect(new Radian(0).acuteAngle(new Radian(Math.PI)).radian).toEqual(Math.PI);
    });

    it('sample 10', () => {
      expect(new Radian(Math.PI).acuteAngle(new Radian(0)).radian).toEqual(-Math.PI);
    });

    it('sample 11', () => {
      expect(new Radian(1).acuteAngle(new Radian(Math.PI + 1)).radian).toEqual(Math.PI);
    });

    it('sample 12', () => {
      expect(new Radian(1).acuteAngle(new Radian(1 - Math.PI)).radian).toEqual(-Math.PI);
    });

    it('sample 13', () => {
      expect(new Radian(7).acuteAngle(new Radian(6)).radian).toEqual(-1);
    });
  });
});
