import { Vec2 } from '../vector/vector';

const DoublePI = Math.PI * 2;
const HalfPI = Math.PI / 2;

export class Radian {
  static fromVector(vector: Vec2): Radian {
    return new Radian(Math.atan2(-vector.y, vector.x) + HalfPI).normalize();
  }

  get radian(): number {
    return this._radian;
  }

  private _radian: number;

  constructor(radian: number) {
    this._radian = radian;
    this.normalize();
  }

  toVector(): Vec2 {
    return {
      x: Math.cos(this._radian),
      y: Math.sin(this._radian)
    };
  }

  /*
   * Normalize radian to [-PI, PI]
   */
  normalize(): Radian {
    this._radian = this._radian % DoublePI;
    if (this._radian < -Math.PI) {
      this._radian += Math.ceil(-this._radian / DoublePI) * DoublePI;
    } else if (this._radian > Math.PI) {
      this._radian -= Math.floor(this._radian / DoublePI) * DoublePI;
    }
    this._radian = this.ensurePositiveZero(this._radian);
    return this;
  }

  acuteAngle(radian2: Radian): Radian {
    let result = (radian2.radian - this._radian) % DoublePI;
    if (result > Math.PI) {
      result = result - DoublePI;
    } else if (result < -Math.PI) {
      result = result + DoublePI;
    }
    return new Radian(result);
  }

  private ensurePositiveZero(value: number): number {
    return value === 0 ? 0 : value;
  }
}
