import { beforeEach, describe, expect, test } from 'vitest';

import { Wait } from '../../delayer/delayer';
import { MapToWeakRefs } from './map-to-weak-refs';

let globalWeakRefHost: any = globalThis;

function withMockWeakRef(callback: (dropAll: () => void) => void): void {
  let originalWeakRef = WeakRef;
  let refs: MockWeakRef<any>[] = [];

  class MockWeakRef<T extends object> implements WeakRef<T> {
    value: T | undefined;
    readonly [Symbol.toStringTag] = 'WeakRef';

    constructor(value: T) {
      this.value = value;
      refs.push(this);
    }

    deref(): T | undefined {
      return this.value;
    }

    drop(): void {
      this.value = undefined;
    }
  }

  let restore = () => {
    globalWeakRefHost.WeakRef = originalWeakRef;
  };

  let dropAll = () => {
    refs.forEach(ref => ref.drop());
  };

  globalWeakRefHost.WeakRef = MockWeakRef;

  try {
    callback(dropAll);
  } finally {
    restore();
  }
}

async function forceGarbageCollection(): Promise<void> {
  await Wait();
  global?.gc?.();
}

describe('MapToWeakRefs', () => {
  describe('String Keys', () => {
    let map: MapToWeakRefs<{ id: number; label?: string }>;

    beforeEach(() => {
      map = new MapToWeakRefs();
    });

    test('get returns stored value', () => {
      let value = { id: 1 };
      map.set('alpha', value);

      expect(map.get('alpha')).toBe(value);
      expect(map.size).toBe(1);
    });

    test('has reports presence and absence', () => {
      let value = { id: 2 };
      map.set('beta', value);
      map.delete('gamma');

      expect(map.has('beta')).toBe(true);
      expect(map.has('gamma')).toBe(false);
    });

    test('delete removes single entry', () => {
      let value = { id: 3 };
      map.set('delta', value);
      map.delete('delta');

      expect(map.get('delta')).toEqual(undefined);
      expect(map.size).toBe(0);
    });

    test('clear empties collection', () => {
      ['a', 'b', 'c'].forEach((key, index) => {
        let item = { id: index };
        map.set(key, item);
      });

      map.clear();

      expect(map.size).toBe(0);
      expect(map.entries()).toStrictEqual([]);
    });

    test('entries values keys mirror storage', () => {
      let entries = [
        { key: 'alpha', id: 1 },
        { key: 'beta', id: 2 },
        { key: 'gamma', id: 3 }
      ];

      entries.forEach(item => {
        let value = { id: item.id };
        map.set(item.key, value);
      });

      expect(map.entries().map(([key, value]) => ({ key, id: value.id }))).toStrictEqual(entries);
      expect(map.values().map(value => value.id)).toStrictEqual(entries.map(item => item.id));
      expect(map.keys()).toStrictEqual(entries.map(item => item.key));
    });

    test('forEach visits entries', () => {
      let data = [
        { key: 'alpha', id: 1 },
        { key: 'beta', id: 2 }
      ];

      data.forEach(item => {
        let value = { id: item.id, label: item.key };
        map.set(item.key, value);
      });

      let visited: { value: number; key: string }[] = [];
      map.forEach((value, key) => {
        visited.push({ value: value.id, key });
      });

      expect(visited).toStrictEqual([
        { key: 'alpha', value: 1 },
        { key: 'beta', value: 2 }
      ]);
    });

    test('stale reference removed during access', () => {
      withMockWeakRef(dropAll => {
        let ghost = { id: 9 };
        map.set('ghost', ghost);

        dropAll();

        expect(map.get('ghost')).toEqual(undefined);
        expect(map.size).toBe(0);
        expect(map.entries()).toStrictEqual([]);
      });
    });
  });

  describe('Number Keys', () => {
    let map: MapToWeakRefs<{ id: number; label?: string }, number>;

    beforeEach(() => {
      map = new MapToWeakRefs<{ id: number; label?: string }, number>();
    });

    test('get returns stored value for numeric keys', () => {
      let value = { id: 111 };
      map.set(1, value);

      expect(map.get(1)).toBe(value);
      expect(map.size).toBe(1);
    });

    test('entries values keys mirror numeric storage', () => {
      let entries = [
        { key: 1, id: 10 },
        { key: 2, id: 20 },
        { key: 3, id: 30 }
      ];

      entries.forEach(item => {
        let value = { id: item.id };
        map.set(item.key, value);
      });

      expect(map.entries().map(([key, value]) => ({ key, id: value.id }))).toStrictEqual(entries);
      expect(map.values().map(value => value.id)).toStrictEqual(entries.map(item => item.id));
      expect(map.keys()).toStrictEqual(entries.map(item => item.key));
    });

    test('delete and has operate with numeric keys', () => {
      let value = { id: 77 };
      map.set(99, value);

      expect(map.has(99)).toBe(true);
      map.delete(99);
      expect(map.has(99)).toBe(false);
    });
  });

  describe('Garbage Collection', () => {
    let map: MapToWeakRefs<{ id: number; label?: string }>;

    beforeEach(() => {
      map = new MapToWeakRefs();
    });

    test('no referance remaining items should be removed from the map after the garbage collection', async () => {
      let item1: { id: number; key: string } | undefined = { id: 1, key: 'alpha' };
      let item2: { id: number; key: string } | undefined = { id: 2, key: 'beta' };

      map.set('a', item1);
      map.set('b', item2);

      expect(map.has('a')).toBeTruthy();
      expect(map.has('b')).toBeTruthy();

      item1 = undefined;
      await forceGarbageCollection();

      expect(map.has('a')).toBeFalsy();
      expect(map.has('b')).toBeTruthy();

      item2 = undefined;
      await forceGarbageCollection();

      expect(map.has('a')).toBeFalsy();
      expect(map.has('b')).toBeFalsy();
    });

    test('entries reflect remaining references after garbage collection', async () => {
      let alpha: { id: number } | undefined = { id: 1 };
      let beta: { id: number } | undefined = { id: 2 };

      map.set('alpha', alpha);
      map.set('beta', beta);

      beta = undefined;
      await forceGarbageCollection();

      expect(map.entries().map(([key]) => key)).toStrictEqual(['alpha']);

      alpha = undefined;
      await forceGarbageCollection();

      expect(map.entries()).toStrictEqual([]);
    });

    test('forEach skips collected references', async () => {
      let keep: { id: number } | undefined = { id: 1 };
      let drop: { id: number } | undefined = { id: 2 };

      map.set('keep', keep);
      map.set('drop', drop);

      let visitedBefore: string[] = [];
      map.forEach((value, key) => {
        visitedBefore.push(key);
      });

      expect(visitedBefore).toStrictEqual(['keep', 'drop']);

      drop = undefined;
      await forceGarbageCollection();

      let visitedAfter: string[] = [];
      map.forEach((value, key) => {
        visitedAfter.push(key);
      });

      expect(visitedAfter).toStrictEqual(['keep']);
    });
  });
});
