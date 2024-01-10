import { Vector } from './vector';

describe('Vector: ', () => {
  describe('IsEqual: ', () => {
    it('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.isEqual(vec1, vec2)).toEqual(true);
    });

    it('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.isEqual(vec1, vec2)).toEqual(false);
    });

    it('sample 3', () => {
      let vec1 = { x: 0, y: 0 };
      expect(Vector.isEqual(vec1, undefined)).toEqual(false);
    });

    it('sample 4', () => {
      let vec2 = { x: 1, y: 1 };
      expect(Vector.isEqual(undefined, vec2)).toEqual(false);
    });

    it('sample 5', () => {
      expect(Vector.isEqual(undefined, undefined)).toEqual(false);
    });
  });

  describe('Sum: ', () => {
    it('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    it('sample 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 1, y: 0 });
    });

    it('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 2, y: 0 });
    });

    it('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 3, y: 0 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 4, y: 1 });
    });

    it('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.sum(vec1, vec2)).toEqual({ x: 5, y: 5 });
    });
  });

  describe('FromTo: ', () => {
    it('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    it('sample 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: -1, y: 0 });
    });

    it('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    it('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 3, y: 0 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 2, y: -1 });
    });

    it('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.fromTo(vec1, vec2)).toEqual({ x: 3, y: 1 });
    });
  });

  describe('Multiply: ', () => {
    it('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.multiply(vec, 1)).toEqual({ x: 0, y: 0 });
    });

    it('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.multiply(vec, 1)).toEqual({ x: 1, y: 0 });
    });

    it('sample 3', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.multiply(vec, 2)).toEqual({ x: 2, y: 0 });
    });

    it('sample 4', () => {
      let vec = { x: 1, y: 1 };
      expect(Vector.multiply(vec, 2)).toEqual({ x: 2, y: 2 });
    });

    it('sample 5', () => {
      let vec = { x: 1, y: 2 };
      expect(Vector.multiply(vec, 2)).toEqual({ x: 2, y: 4 });
    });
  });

  describe('Round: ', () => {
    it('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 0, y: 0 });
    });

    it('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 1, y: 0 });
    });

    it('sample 3', () => {
      let vec = { x: 1.2, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 1, y: 0 });
    });

    it('sample 4', () => {
      let vec = { x: 1.5, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 2, y: 0 });
    });

    it('sample 5', () => {
      let vec = { x: 1.6, y: 0 };
      expect(Vector.round(vec)).toEqual({ x: 2, y: 0 });
    });
  });

  describe('Rotate: ', () => {
    it('basic rotation 1', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.rotate(vec1, vec2, false)).toEqual({ x: 1, y: 0 });
    });

    it('basic rotation 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 1 };
      expect(Vector.rotate(vec1, vec2, false)).toEqual({ x: 0, y: 1 });
    });

    it('rotation with normalization', () => {
      let vec1 = { x: 3, y: 0 };
      let vec2 = { x: 0, y: 2 };
      expect(Vector.rotate(vec1, vec2)).toEqual({ x: 0, y: 3 });
    });

    it('complex rotation with normalization 1', () => {
      let vec1 = { x: 3, y: 2 };
      let vec2 = { x: 2, y: 3 };
      expect(Vector.rotate(vec1, vec2)).toEqual({ x: 0, y: 3.6055512754639896 });
    });

    it('complex rotation with normalization 2', () => {
      let vec1 = { x: 3, y: 2 };
      let vec2 = { x: -1, y: 3 };
      expect(Vector.rotate(vec1, vec2)).toEqual({ x: -2.846049894151541, y: 2.213594362117865 });
    });
  });

  describe('Normalize: ', () => {
    it('basic 1', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.normalize(vec)).toEqual({ x: 1, y: 0 });
    });

    it('basic 2', () => {
      let vec = { x: 0, y: 1 };
      expect(Vector.normalize(vec)).toEqual({ x: 0, y: 1 });
    });

    it('normalize bigger than 1', () => {
      let vec = { x: 3, y: 4 };
      expect(Vector.normalize(vec)).toEqual({ x: 0.6, y: 0.8 });
    });

    it('normalize smaller than 1', () => {
      let vec = { x: 0.3, y: 0.4 };
      expect(Vector.normalize(vec)).toEqual({ x: 0.6, y: 0.8 });
    });

    it('normalize zero vector', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.normalize(vec)).toEqual({ x: 1, y: 0 });
    });
  });

  describe('Projection: ', () => {
    it('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    it('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 1 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 0, y: 0 });
    });

    it('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 1, y: 0 });
    });

    it('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 3, y: 0 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 1, y: 0 });
    });

    it('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.projection(vec1, vec2)).toEqual({ x: 1.6, y: 1.2000000000000002 });
    });
  });

  describe('GetDotProduct: ', () => {
    it('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(0);
    });

    it('sample 2', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(0);
    });

    it('sample 3', () => {
      let vec1 = { x: 1, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(1);
    });

    it('sample 4', () => {
      let vec1 = { x: 1, y: 1 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(1);
    });

    it('sample 5', () => {
      let vec1 = { x: 1, y: 2 };
      let vec2 = { x: 4, y: 3 };
      expect(Vector.getDotProduct(vec1, vec2)).toEqual(10);
    });
  });

  describe('GetDistance: ', () => {
    it('sample 1', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 0 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(0);
    });

    it('sample 2', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 1, y: 0 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(1);
    });

    it('sample 3', () => {
      let vec1 = { x: 0, y: 0 };
      let vec2 = { x: 0, y: 1 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(1);
    });

    it('sample 4', () => {
      let vec1 = { x: 3, y: 0 };
      let vec2 = { x: 0, y: 4 };
      expect(Vector.getDistance(vec1, vec2)).toEqual(5);
    });
  });

  describe('GetLength: ', () => {
    it('sample 1', () => {
      let vec = { x: 0, y: 0 };
      expect(Vector.getLength(vec)).toEqual(0);
    });

    it('sample 2', () => {
      let vec = { x: 1, y: 0 };
      expect(Vector.getLength(vec)).toEqual(1);
    });

    it('sample 3', () => {
      let vec = { x: 0, y: 1 };
      expect(Vector.getLength(vec)).toEqual(1);
    });

    it('sample 4', () => {
      let vec = { x: 3, y: 4 };
      expect(Vector.getLength(vec)).toEqual(5);
    });
  });
});
