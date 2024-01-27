import { JsonHelper } from './json-helper';

describe(`Json Helper: `, () => {
  describe(`Deep Find: `, () => {
    it('should not break with undefined object', () => {
      expect(JsonHelper.deepFind(undefined, 'a.b')).toBeUndefined();
    });

    it('should return undefined with primitive types', () => {
      expect(JsonHelper.deepFind('str', 'a.b')).toBeUndefined();
      expect(JsonHelper.deepFind(1, 'a.b')).toBeUndefined();
      expect(JsonHelper.deepFind(true, 'a.b')).toBeUndefined();
    });

    it('should return the object with empty path', () => {
      let object = { a: 1 };
      expect(JsonHelper.deepFind(object, '')).toEqual(object);
    });

    it('should find one level deep properties', () => {
      let object = { a: 1 };
      expect(JsonHelper.deepFind(object, 'a')).toEqual(1);
    });

    it('should find multiple level deep properties', () => {
      let object = { a: { b: { c: 1 } } };
      expect(JsonHelper.deepFind(object, 'a.b.c')).toEqual(1);
    });

    it('should return undefined if the path is not pointing anything', () => {
      let object = { a: { b: 2 } };
      expect(JsonHelper.deepFind(object, 'a.b.c')).toBeUndefined();
    });

    it('should support arrays', () => {
      let object = { a: [{ b: 1 }] };
      expect(JsonHelper.deepFind(object, 'a[0].b')).toEqual(1);
    });

    it('should support nested arrays', () => {
      let object = { a: [[{ b: 1 }], [{ b: 2 }]] };
      expect(JsonHelper.deepFind(object, 'a[1][0].b')).toEqual(2);
    });

    it('should return undefined with invalid array path', () => {
      let object = { a: [[{ b: 1 }], [{ b: 2 }]] };
      expect(JsonHelper.deepFind(object, 'a[1][0.b')).toBeUndefined();
    });
  });

  describe(`Deep Copy: `, () => {
    it('should work with primitive types', () => {
      // eslint-disable-next-line no-null/no-null
      let primitiveTypeSamples = [undefined, null, NaN, 0, 1, '', '0', 'false', 'true', 'str', true, false];
      primitiveTypeSamples.forEach(item => {
        let copy = JsonHelper.deepCopy(item);
        expect(JSON.stringify(item)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      });
    });

    it('should deep copy objects', () => {
      let sampleObjects = [{}, { a: 1 }, { a: true }, { a: {} }, { a: { b: 1 } }];
      sampleObjects.forEach(item => {
        let copy = JsonHelper.deepCopy(item);
        expect(JSON.stringify(item)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
        expect(item !== copy).toEqual(true);
      });
    });

    it('should deep copy also inner objects', () => {
      let obj = { a: { b: { c: 1 } } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
    });

    it('should respect "Array" type', () => {
      let obj = { a: { b: [{ c: 1 }, { c: 2 }] } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
    });

    it('should respect "Set" type', () => {
      let obj = { a: { b: new Set<string>(['a']) } };
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
      expect(copy.a.b.has('a')).toEqual(true);
    });

    it('should respect "Map" type', () => {
      let obj = { a: { b: new Map<string, string>() } };
      obj.a.b.set('a', 'b');
      let copy = JsonHelper.deepCopy(obj);

      expect(JSON.stringify(obj)).toEqual(JSON.stringify(JsonHelper.deepCopy(copy)));
      expect(obj !== copy).toEqual(true);
      expect(obj.a !== copy.a).toEqual(true);
      expect(obj.a.b !== copy.a.b).toEqual(true);
      expect(copy.a.b.get('a')).toEqual('b');
    });

    it('should throw error for looped object', () => {
      let obj: any = {};
      obj.obj = obj;
      expect(() => {
        JsonHelper.deepCopy(obj);
      }).toThrow();
    });
  });

  describe(`Merge Maps: `, () => {
    it('should combines all entries of two maps', () => {
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
  });

  describe(`Get Subset: `, () => {
    it('should return the subset of object', () => {
      let result = JsonHelper.getSubset({ a: 1, b: 2, c: 3 }, ['a', 'b']);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should throw error if called by non object parameter', () => {
      expect(() => {
        JsonHelper.getSubset('a', ['a']);
      }).toThrow();
    });
  });

  describe(`Array to Object: `, () => {
    it('should convert empty array to object', () => {
      let result = JsonHelper.arrayToObject([], 'a');
      expect(result).toEqual({});
    });

    it('should convert array to object', () => {
      let result = JsonHelper.arrayToObject(
        [
          { a: { key: 'one' }, val: 1 },
          { a: { key: 'two' }, val: 2 }
        ],
        'a.key'
      );
      expect(result).toEqual({ one: { a: { key: 'one' }, val: 1 }, two: { a: { key: 'two' }, val: 2 } });
    });

    it('should convert array to object with transform function', () => {
      let result = JsonHelper.arrayToObject(
        [
          { a: { key: 'one' }, val: 1 },
          { a: { key: 'two' }, val: 2 }
        ],
        'a.key',
        item => item.val
      );
      expect(result).toEqual({ one: 1, two: 2 });
    });

    it('should not change the original array', () => {
      let array = [
        { a: { key: 'one' }, val: 1 },
        { a: { key: 'two' }, val: 2 }
      ];

      JsonHelper.arrayToObject(array, 'a.key', item => {
        delete item.a?.key;
        return item;
      });
      expect(array).toEqual([
        { a: {}, val: 1 },
        { a: {}, val: 2 }
      ]);
    });

    it('should throw error if called by empty string parameter', () => {
      expect(() => {
        JsonHelper.arrayToObject([], '');
      }).toThrow();
    });

    it('should throw error if key is not found', () => {
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

    it('should throw error if key is not a string', () => {
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
  });
});
