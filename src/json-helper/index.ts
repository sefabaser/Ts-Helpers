interface MapDifferenceSame<T, K> {
  readonly state: 'same';
  readonly key: T;
  readonly value1: K;
  readonly value2: K;
}

interface MapDifferencePlus<T, K> {
  readonly state: 'plus';
  readonly key: T;
  readonly value1: undefined;
  readonly value2: K;
}

interface MapDifferenceMinus<T, K> {
  readonly state: 'minus';
  readonly key: T;
  readonly value1: K;
  readonly value2: undefined;
}

interface MapDifferenceDifferent<T, K> {
  readonly state: 'different';
  readonly key: T;
  readonly value1: K;
  readonly value2: K;
}

export type MapDifference<T, K> =
  | MapDifferenceSame<T, K>
  | MapDifferencePlus<T, K>
  | MapDifferenceMinus<T, K>
  | MapDifferenceDifferent<T, K>;
