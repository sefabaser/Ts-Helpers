export interface Vec2 {
  readonly x: number;
  readonly y: number;
}

export interface Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export class Vector {
  static isEqual(vector1: Vec2 | undefined, vector2: Vec2 | undefined): boolean {
    if (!vector1 || !vector2) {
      return false;
    } else {
      return vector1.x === vector2.x && vector1.y === vector2.y;
    }
  }

  static sum(vector1: Vec2, vector2: Vec2): Vec2 {
    return {
      x: vector1.x + vector2.x,
      y: vector1.y + vector2.y
    };
  }

  static fromTo(from: Vec2, to: Vec2): Vec2 {
    return {
      x: to.x - from.x,
      y: to.y - from.y
    };
  }

  static multiply(vector: Vec2, multiplier: number): Vec2 {
    return {
      x: vector.x * multiplier,
      y: vector.y * multiplier
    };
  }

  static round(vector: Vec2): Vec2 {
    return {
      x: Math.round(vector.x),
      y: Math.round(vector.y)
    };
  }

  static rotate(vector1: Vec2, vector2: Vec2, normalize: boolean = true): Vec2 {
    if (normalize) {
      vector2 = this.normalize(vector2);
    }
    return { x: vector1.x * vector2.x - vector1.y * vector2.y, y: vector1.x * vector2.y + vector1.y * vector2.x };
  }

  static normalize(vector: Vec2, value: number = 1): Vec2 {
    let length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    if (length === 0 || value === 0) {
      return { x: 1, y: 0 };
    } else {
      length = length / value;
      return { x: vector.x / length, y: vector.y / length };
    }
  }

  static projection(vector1: Vec2, vector2: Vec2): Vec2 {
    let vector2Length = this.getLength(vector2);
    if (vector2Length === 0) {
      return { x: 0, y: 0 };
    }

    let dotProduct = this.getDotProduct(vector1, vector2);
    let multiplier = dotProduct / (vector2Length * vector2Length);
    return {
      x: multiplier * vector2.x,
      y: multiplier * vector2.y
    };
  }

  static getDotProduct(vector1: Vec2, vector2: Vec2): number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }

  static getLength(vector: Vec2): number {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  }

  static getDistance(vector1: Vec2, vector2: Vec2): number {
    return Math.abs(this.getLength(this.fromTo(vector1, vector2)));
  }
}
