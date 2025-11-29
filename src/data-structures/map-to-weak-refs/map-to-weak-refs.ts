export class MapToWeakRefs<ValueType extends object, KeyType extends number | string = string> {
  private _refs: Map<KeyType, WeakRef<ValueType>> = new Map();

  get size(): number {
    return this._refs.size;
  }

  set(key: KeyType, value: ValueType): void {
    this._refs.set(key, new WeakRef(value));
  }

  get(key: KeyType): ValueType | undefined {
    return this._getOrDestroy(key);
  }

  has(key: KeyType): boolean {
    return this._getOrDestroy(key) !== undefined;
  }

  delete(key: KeyType): void {
    this._refs.delete(key);
  }

  clear(): void {
    this._refs.clear();
  }

  entries(): [KeyType, ValueType][] {
    return this._cleanEmptyRefsAndGetEntries();
  }

  values(): ValueType[] {
    return this._cleanEmptyRefsAndGetEntries().map(([_, value]) => value);
  }

  keys(): KeyType[] {
    return this._cleanEmptyRefsAndGetEntries().map(([key, _]) => key);
  }

  forEach(callbackfn: (value: ValueType, key: KeyType, map: MapToWeakRefs<ValueType, KeyType>) => void): void {
    let entries = this._cleanEmptyRefsAndGetEntries();
    for (let [key, value] of entries) {
      callbackfn(value, key, this);
    }
  }

  private _cleanEmptyRefsAndGetEntries(): [KeyType, ValueType][] {
    let entries: [KeyType, ValueType][] = [];
    for (let [key, ref] of this._refs.entries()) {
      let value = this._derefOrDestroy(ref, key);
      if (value !== undefined) {
        entries.push([key, value]);
      }
    }
    return entries;
  }

  private _getOrDestroy(key: KeyType): ValueType | undefined {
    let ref = this._refs.get(key);
    if (ref !== undefined) {
      return this._derefOrDestroy(ref, key);
    }
  }

  private _derefOrDestroy(ref: WeakRef<ValueType>, key: KeyType): ValueType | undefined {
    let value = ref.deref();
    if (value === undefined) {
      this._refs.delete(key);
    }
    return value;
  }
}
