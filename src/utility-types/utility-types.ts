export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type FixedArray<T, L extends number> = { length: L } & Array<T>;
export type ReadonlyFixedArray<T, L extends number> = { length: L } & ReadonlyArray<T>;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (...args: any[]) => any
    ? T[P]
    : T[P] extends Array<infer U>
      ? ReadonlyArray<DeepReadonly<U>>
      : T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P];
};

/**
 * Creates type-value pair type. The type of the value will be defined by the given type or the key of the type map interface.
 * @param M - The type map interface.
 * @param T - The type of the key. Optional: If not provided, the key will be inferred from the type map interface.
 * @returns The type-value pair type.
 * @example
 * ```ts
 * type EventEntry = TypeValuePair<{
 *   name: string;
 *   age: number;
 * }>;
 *
 * let a: EventEntry = {
 *   type: 'name',
 *   value: 'John'
 * };
 *
 * let b: EventEntry = {
 *   type: 'age',
 *   value: 18
 * };
 *
 * if (a.type === 'name') {
 *   let value = a.value; // type of value is string
 * }
 *
 * if (b.type === 'age') {
 *   let value = b.value; // type of value is number
 * }
 * ```
 */
export type TypeValuePair<M extends Record<T, any>, T extends string = keyof M & string> = {
  [K in T]: {
    readonly type: K;
    readonly value: M[K];
  };
}[T];

export type EmptyObject = Record<string, never>;
