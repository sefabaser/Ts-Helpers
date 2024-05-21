import { Vector } from '../vector/vector';

export class Line {
  readonly from: Vector;
  readonly to: Vector;

  private _fromTo: Vector | undefined;
  get fromTo(): Vector {
    if (this._fromTo === undefined) {
      this._fromTo = Vector.fromTo(this.from, this.to);
    }
    return this._fromTo;
  }

  get length(): number {
    return this.fromTo.length;
  }

  constructor(from: Vector, to: Vector) {
    this.from = from;
    this.to = to;
  }
}
