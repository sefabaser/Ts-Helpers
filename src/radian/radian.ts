import { Vec2 } from '../vector/vector';

const DoublePI = Math.PI * 2;
const HalfPI = Math.PI / 2;

export class Radian {
  static vectorToRadian(vector: Vec2): number {
    return Math.atan2(-vector.y, vector.x) + HalfPI;
  }

  static radianToVector(radian: number): Vec2 {
    return {
      x: this.removeUnderflow(Math.sin(radian)),
      y: this.removeUnderflow(Math.cos(radian))
    };
  }

  /*
   * Normalize radian to [-PI, PI]
   */
  static normalize(radian: number): number {
    radian = radian % DoublePI;
    if (radian < -Math.PI) {
      radian += Math.ceil(-radian / DoublePI) * DoublePI;
    } else if (radian > Math.PI) {
      radian -= Math.floor(radian / DoublePI) * DoublePI;
    }
    return this.ensurePositiveZero(radian);
  }

  static acuteAngle(radian1: number, radian2: number): number {
    let result = (radian2 - radian1) % DoublePI;
    if (result > Math.PI) {
      result = result - DoublePI;
    } else if (result < -Math.PI) {
      result = result + DoublePI;
    }
    return result;
  }

  private static ensurePositiveZero(value: number): number {
    return value === 0 ? 0 : value;
  }

  private static removeUnderflow(num: number): number {
    return Math.abs(num) < Number.EPSILON ? 0 : Number.parseFloat(num.toFixed(15));
  }
}
