import { describe, expect, test } from 'vitest';

import { JsonHelper } from './json-helper';

describe(`Json Helper: `, () => {
  describe(`Deep Find: `, () => {
    test('should not break with undefined object', () => {
      expect(JsonHelper.deepFind(undefined, 'a.b')).toBeUndefined();
    });

    test('should return undefined with primitive types', () => {
      expect(JsonHelper.deepFind('str', 'a.b')).toBeUndefined();
      expect(JsonHelper.deepFind(1, 'a.b')).toBeUndefined();
      expect(JsonHelper.deepFind(true, 'a.b')).toBeUndefined();
    });

    test('should return the object with empty path', () => {
      let object = { a: 1 };
      expect(JsonHelper.deepFind(object, '')).toEqual(object);
    });

    test('should find one level deep properties', () => {
      let object = { a: 1 };
      expect(JsonHelper.deepFind(object, 'a')).toEqual(1);
    });

    test('should find multiple level deep properties', () => {
      let object = { a: { b: { c: 1 } } };
      expect(JsonHelper.deepFind(object, 'a.b.c')).toEqual(1);
    });

    test('should return undefined if the path is not pointing anything', () => {
      let object = { a: { b: 2 } };
      expect(JsonHelper.deepFind(object, 'a.b.c')).toBeUndefined();
    });

    test('should support arrays', () => {
      let object = { a: [{ b: 1 }] };
      expect(JsonHelper.deepFind(object, 'a[0].b')).toEqual(1);
    });

    test('should support nested arrays', () => {
      let object = { a: [[{ b: 1 }], [{ b: 2 }]] };
      expect(JsonHelper.deepFind(object, 'a[1][0].b')).toEqual(2);
    });

    test('should return undefined with invalid array path', () => {
      let object = { a: [[{ b: 1 }], [{ b: 2 }]] };
      expect(JsonHelper.deepFind(object, 'a[1][0.b')).toBeUndefined();
    });
  });

  describe(`Deep Copy: `, () => {
    test('should work with primitive types', () => {
      // biome-ignore lint:all
      let primitiveTypeSamples = [undefined, null, NaN, 0, 1, '', '0', 'false', 'true', 'str', true, false];
      primitiveTypeSamples.forEach(item => {
        let copy = JsonHelper.deepCopy(item);
        expect(JSON.stringify(item)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      });
    });

    test('should deep copy objects', () => {
      let sampleObjects = [{}, { a: 1 }, { a: true }, { a: {} }, { a: { b: 1 } }];
      sampleObjects.forEach(item => {
        let copy = JsonHelper.deepCopy(item);
        expect(JSON.stringify(item)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
        expect(item !== copy).toEqual(true);
      });
    });

    test('should deep copy also inner objects', () => {
      let obj = { a: { b: { c: 1 } } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
    });

    test('should respect "Array" type', () => {
      let obj = { a: { b: [{ c: 1 }, { c: 2 }] } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
    });

    test('should respect "Set" type', () => {
      let obj = { a: { b: new Set<string>(['a']) } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
      expect(copy.a.b.has('a')).toEqual(true);
    });

    test('should respect "Map" type', () => {
      let obj = { a: { b: new Map<string, string>() } };
      obj.a.b.set('a', 'b');
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
      expect(copy.a.b.get('a')).toEqual('b');
    });

    test('should respect "Function" type', () => {
      let obj = { a: { b: (value: number) => value * 2 } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b(123)).toEqual(copy.a.b(123));
    });

    test('should throw error for looped object', () => {
      let obj: any = {};
      obj.obj = obj;
      expect(() => {
        JsonHelper.deepCopy(obj);
      }).toThrow('Deep copy attempt on circularly dependent object!');
    });
  });

  describe(`Merge Maps: `, () => {
    test('should combines all entries of two maps', () => {
      let map1 = new Map<string, string>();
      let map2 = new Map<string, string>();
      map1.set('a', '1');
      map1.set('b', '2');
      map2.set('x', '3');
      map2.set('y', '4');

      let mergedMap = JsonHelper.mergeMaps(map1, map2);
      expect(mergedMap.size).toEqual(4);
      expect(mergedMap.get('a')).toEqual('1');
      expect(mergedMap.get('b')).toEqual('2');
      expect(mergedMap.get('x')).toEqual('3');
      expect(mergedMap.get('y')).toEqual('4');
    });

    test('different type maps should complain', () => {
      let map1 = new Map<string, string>();
      let map2 = new Map<number, string>();
      let map3 = new Map<string, number>();

      // @ts-expect-error
      JsonHelper.mergeMaps(map1, map2);
      // @ts-expect-error
      JsonHelper.mergeMaps(map1, map3);
    });
  });

  describe(`Difference Maps: `, () => {
    test('empty maps', () => {
      let result = JsonHelper.differenceMaps(new Map(), new Map());
      expect(result.size).toEqual(0);
    });

    test('same values', () => {
      let map1 = new Map([
        ['a', 1],
        ['b', 2]
      ]);
      let map2 = new Map([
        ['a', 1],
        ['b', 2]
      ]);
      let result = JsonHelper.differenceMaps(map1, map2);
      expect([...result.entries()]).toEqual([
        ['a', { state: 'same', key: 'a', value1: 1, value2: 1 }],
        ['b', { state: 'same', key: 'b', value1: 2, value2: 2 }]
      ]);
    });

    test('different values', () => {
      let map1 = new Map([['a', 1]]);
      let map2 = new Map([['a', 99]]);
      let result = JsonHelper.differenceMaps(map1, map2);
      expect([...result.entries()]).toEqual([['a', { state: 'different', key: 'a', value1: 1, value2: 99 }]]);
    });

    test('key only in map1 (minus)', () => {
      let map1 = new Map([['a', 1]]);
      let map2 = new Map<string, number>();
      let result = JsonHelper.differenceMaps(map1, map2);
      expect([...result.entries()]).toEqual([['a', { state: 'minus', key: 'a', value1: 1, value2: undefined }]]);
    });

    test('key only in map2 (plus)', () => {
      let map1 = new Map<string, number>();
      let map2 = new Map([['a', 1]]);
      let result = JsonHelper.differenceMaps(map1, map2);
      expect([...result.entries()]).toEqual([['a', { state: 'plus', key: 'a', value1: undefined, value2: 1 }]]);
    });

    test('mixed states', () => {
      let map1 = new Map([
        ['same', 1],
        ['diff', 2],
        ['minus', 3]
      ]);
      let map2 = new Map([
        ['same', 1],
        ['diff', 99],
        ['plus', 4]
      ]);
      let result = JsonHelper.differenceMaps(map1, map2);
      expect([...result.entries()]).toEqual([
        ['same', { state: 'same', key: 'same', value1: 1, value2: 1 }],
        ['diff', { state: 'different', key: 'diff', value1: 2, value2: 99 }],
        ['minus', { state: 'minus', key: 'minus', value1: 3, value2: undefined }],
        ['plus', { state: 'plus', key: 'plus', value1: undefined, value2: 4 }]
      ]);
    });

    test('does not mutate the original maps', () => {
      let map1 = new Map([['a', 1]]);
      let map2 = new Map([['b', 2]]);
      JsonHelper.differenceMaps(map1, map2);
      expect([...map1.entries()]).toEqual([['a', 1]]);
      expect([...map2.entries()]).toEqual([['b', 2]]);
    });

    test('undefined as value', () => {
      let map1 = new Map([['a', undefined]]);
      let map2 = new Map([['b', undefined]]);
      let result = JsonHelper.differenceMaps(map1, map2);
      expect([...result.entries()]).toEqual([
        ['a', { state: 'minus', key: 'a', value1: undefined, value2: undefined }],
        ['b', { state: 'plus', key: 'b', value1: undefined, value2: undefined }]
      ]);
    });

    test('different type maps should complain', () => {
      let map1 = new Map<string, string>();
      let map2 = new Map<number, string>();
      let map3 = new Map<string, number>();

      // @ts-expect-error
      JsonHelper.differenceMaps(map1, map2);
      // @ts-expect-error
      JsonHelper.differenceMaps(map1, map3);
    });
  });

  describe(`Get Subset: `, () => {
    test('should return the subset of object', () => {
      let result = JsonHelper.getSubset({ a: 1, b: 2, c: 3 }, ['a', 'b']);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test('should throw error if called by non object parameter', () => {
      expect(() => {
        JsonHelper.getSubset('a', ['a']);
      }).toThrow();
    });
  });

  describe(`Array to Object: `, () => {
    test('should convert empty array to object', () => {
      let result = JsonHelper.arrayToObject([], 'a');
      expect(result).toEqual({});
    });

    test('should convert array to object', () => {
      let result = JsonHelper.arrayToObject(
        [
          { a: { key: 'one' }, val: 1 },
          { a: { key: 'two' }, val: 2 }
        ],
        'a.key'
      );
      expect(result).toEqual({ one: { a: { key: 'one' }, val: 1 }, two: { a: { key: 'two' }, val: 2 } });
    });

    test('should convert array to object with transform function', () => {
      let result = JsonHelper.arrayToObject(
        [
          { a: { key: 'one' }, val: 1 },
          { a: { key: 'two' }, val: 2 }
        ],
        'a.key',
        { transformFunction: item => item.val }
      );
      expect(result).toEqual({ one: 1, two: 2 });
    });

    test('should not change the original array', () => {
      let array = [
        { a: { key: 'one' }, val: 1 },
        { a: { key: 'two' }, val: 2 }
      ];

      JsonHelper.arrayToObject(array, 'a.key', {
        transformFunction: item => ({
          a: {},
          val: item.val
        })
      });
      expect(array).toEqual([
        { a: { key: 'one' }, val: 1 },
        { a: { key: 'two' }, val: 2 }
      ]);
    });

    test('should throw error if called by empty string parameter', () => {
      expect(() => {
        JsonHelper.arrayToObject([], '');
      }).toThrow();
    });

    test('should throw error if key is not found', () => {
      expect(() => {
        JsonHelper.arrayToObject(
          [
            { a: 'one', val: 1 },
            { a: 'two', val: 2 }
          ],
          'b'
        );
      }).toThrow();
    });

    test('should throw error if key is not a string', () => {
      expect(() => {
        JsonHelper.arrayToObject(
          [
            { a: 1, val: 1 },
            { a: 2, val: 2 }
          ],
          'a'
        );
      }).toThrow();
    });

    test('should remove key option', () => {
      let result = JsonHelper.arrayToObject(
        [
          { a: { key: 'one', b: 1 }, val: 1 },
          { a: { key: 'two', b: 2 }, val: 2 }
        ],
        'a.key',
        { removeKey: true }
      );
      expect(result).toEqual({ one: { a: { b: 1 }, val: 1 }, two: { a: { b: 2 }, val: 2 } });
    });
  });

  describe(`Map to Object: `, () => {
    test('empty map', () => {
      let map = new Map<string, number>();
      expect(JsonHelper.mapToObject(map)).toEqual({});
    });

    test('string keys', () => {
      let map = new Map<string, number>([
        ['a', 1],
        ['b', 2]
      ]);
      expect(JsonHelper.mapToObject(map)).toEqual({ a: 1, b: 2 });
    });

    test('number keys', () => {
      let map = new Map<number, string>([
        [1, 'a'],
        [2, 'b']
      ]);
      expect(JsonHelper.mapToObject(map)).toEqual({ 1: 'a', 2: 'b' });
    });

    test('with transform function', () => {
      let map = new Map<string, number>([
        ['a', 1],
        ['b', 2]
      ]);
      expect(JsonHelper.mapToObject(map, { transformFunction: key => key.length })).toEqual({ a: 1, b: 1 });
    });

    test('does not mutate the original map', () => {
      let map = new Map<string, number>([
        ['a', 1],
        ['b', 2]
      ]);
      JsonHelper.mapToObject(map);
      expect([...map.entries()]).toEqual([
        ['a', 1],
        ['b', 2]
      ]);
    });

    test('transform function overrides original value', () => {
      let map = new Map<string, number>([['x', 99]]);
      expect(JsonHelper.mapToObject(map, { transformFunction: () => 0 })).toEqual({ x: 0 });
    });

    test('transform function overrides original value', () => {
      interface Foo {
        a: string;
      }
      let foo: Foo = { a: 'b' };
      let map = new Map<Foo, number>([[foo, 99]]);
      // @ts-expect-error - we want to test the type error
      JsonHelper.mapToObject(map);
    });
  });

  describe(`Object to Map: `, () => {
    test('empty object', () => {
      let result = JsonHelper.objectToMap({});
      expect(result.size).toEqual(0);
    });

    test('string keys', () => {
      let result = JsonHelper.objectToMap({ a: 1, b: 2 });
      expect([...result.entries()]).toEqual([
        ['a', 1],
        ['b', 2]
      ]);
    });

    test('number keys', () => {
      let result = JsonHelper.objectToMap({ 1: 'a', 2: 'b' });
      expect([...result.entries()]).toEqual([
        ['1', 'a'],
        ['2', 'b']
      ]);
    });

    test('returns a Map instance', () => {
      let result = JsonHelper.objectToMap({ x: 10 });
      expect(result).toBeInstanceOf(Map);
    });

    test('object values', () => {
      let result = JsonHelper.objectToMap({ a: { nested: true }, b: { nested: false } });
      expect([...result.entries()]).toEqual([
        ['a', { nested: true }],
        ['b', { nested: false }]
      ]);
    });

    test('roundtrip with mapToObject', () => {
      type Foo = 'a' | 'b' | 'c';
      let original: Record<Foo, number> = { a: 1, b: 2, c: 3 };
      let map = JsonHelper.objectToMap(original);
      let back = JsonHelper.mapToObject(map);
      expect(back).toEqual(original);
    });
  });

  describe(`Object For Each: `, () => {
    test('empty object', () => {
      let keys: string[] = [];
      JsonHelper.objectForEach({}, key => {
        keys.push(key);
      });
      expect(keys).toEqual([]);
    });

    test('iterates all entries', () => {
      let entries: [string, number][] = [];
      JsonHelper.objectForEach({ a: 1, b: 2, c: 3 }, (key, value) => {
        entries.push([key, value]);
      });
      expect(entries).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
    });

    test('provides correct key and value to callback', () => {
      let result: Record<string, string> = {};
      JsonHelper.objectForEach({ x: 'hello', y: 'world' }, (key, value) => {
        result[key] = value.toUpperCase();
      });
      expect(result).toEqual({ x: 'HELLO', y: 'WORLD' });
    });

    test('number keys are passed as strings', () => {
      let keys: string[] = [];
      JsonHelper.objectForEach({ 1: 'a', 2: 'b' }, key => {
        keys.push(typeof key);
      });
      expect(keys).toEqual(['string', 'string']);
    });

    test('does not mutate the original object', () => {
      let obj = { a: 1, b: 2 };
      JsonHelper.objectForEach(obj, () => {});
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });

  describe(`Object Map: `, () => {
    test('empty object', () => {
      let result = JsonHelper.objectMap({}, () => 0);
      expect(result).toEqual([]);
    });

    test('transforms values', () => {
      let result = JsonHelper.objectMap({ a: 1, b: 2 }, (_key, value) => value * 10);
      expect(result).toEqual([10, 20]);
    });

    test('transforms keys', () => {
      let result = JsonHelper.objectMap({ a: 1, b: 2 }, key => key.toUpperCase());
      expect(result).toEqual(['A', 'B']);
    });

    test('transforms keys and values together', () => {
      let result = JsonHelper.objectMap({ x: 'hello', y: 'world' }, (key, value) => `${key}:${value}`);
      expect(result).toEqual(['x:hello', 'y:world']);
    });

    test('returns array with different type than input values', () => {
      let result = JsonHelper.objectMap({ a: 1, b: 2, c: 3 }, (key, value) => ({ name: key, double: value * 2 }));
      expect(result).toEqual([
        { name: 'a', double: 2 },
        { name: 'b', double: 4 },
        { name: 'c', double: 6 }
      ]);
    });

    test('does not mutate the original object', () => {
      let obj = { a: 1, b: 2 };
      JsonHelper.objectMap(obj, (_key, value) => value * 2);
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });
});
