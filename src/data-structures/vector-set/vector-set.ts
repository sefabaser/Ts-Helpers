import { Vector } from '../../geometry/vector/vector';

export class VectorSet {
  private values: Map<number, Set<number>> = new Map();

  add(vector: Vector): void {
    let set = this.values.get(vector.x);
    if (!set) {
      set = new Set();
      this.values.set(vector.x, set);
    }
    set.add(vector.y);
  }

  has(vector: Vector): boolean {
    let set = this.values.get(vector.x);
    return set ? set.has(vector.y) : false;
  }

  delete(vector: Vector): boolean {
    let set = this.values.get(vector.x);
    return set ? set.delete(vector.y) : false;
  }
}
