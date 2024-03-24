import { NumberHelper } from '../number-helper/number-helper';
import { Vec2 } from '../vector/vector';

const DoublePI = Math.PI * 2;
const HalfPI = Math.PI / 2;

export class Radian {
  static random(): number {
    return Math.random() * DoublePI - Math.PI;
  }

  static vectorToRadian(vector: Vec2): number {
    let radian = Math.atan2(vector.y, vector.x) + HalfPI;
    return radian > Math.PI ? radian - DoublePI : radian;
  }

  static radianToVector(radian: number): Vec2 {
    return {
      x: NumberHelper.removeUnderflow(Math.sin(radian)),
      y: NumberHelper.removeUnderflow(Math.cos(Math.PI - radian))
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
    return NumberHelper.ensurePositiveZero(radian);
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
}
