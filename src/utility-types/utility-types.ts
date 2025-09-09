export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type FixedArray<T, L extends number> = { length: L } & Array<T>;
export type ReadonlyFixedArray<T, L extends number> = { length: L } & ReadonlyArray<T>;

export type JSVariableType = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (...args: any[]) => any
  ? T[P]
  : T[P] extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T[P] extends object
  ? DeepReadonly<T[P]>
  : T[P];
};

export type TypeValuePair<T extends string, M extends Record<T, any>> = {
  [K in T]: {
    readonly type: K;
    readonly value: M[K];
  };
}[T];
