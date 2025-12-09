import { Vector } from '../../geometry/vector/vector';

export class VectorSet {
  private _values: Map<number, Set<number>> = new Map();

  add(vector: Vector): void {
    let set = this._values.get(vector.x);
    if (!set) {
      set = new Set();
      this._values.set(vector.x, set);
    }
    set.add(vector.y);
  }

  has(vector: Vector): boolean {
    let set = this._values.get(vector.x);
    return set ? set.has(vector.y) : false;
  }

  delete(vector: Vector): boolean {
    let set = this._values.get(vector.x);
    return set ? set.delete(vector.y) : false;
  }
}
