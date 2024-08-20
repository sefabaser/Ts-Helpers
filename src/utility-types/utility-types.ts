export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type FixedArray<T, L extends number> = { length: L } & Array<T>;
export type ReadonlyFixedArray<T, L extends number> = { length: L } & ReadonlyArray<T>;
