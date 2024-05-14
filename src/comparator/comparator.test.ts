/* eslint-disable no-null/no-null */
import { describe, expect, test } from 'vitest';

import { Comparator } from './comparator';

describe('Comparator: ', () => {
  describe('IsFunction: ', () => {
    test('should compare non function object', () => {
      let obj = 'str';
      expect(Comparator.isFunction(obj)).toEqual(false);
    });

    test('should compare function', () => {
      let arrowFunction = (): void => {};
      let functionExpression = function (): void {};
      expect(Comparator.isFunction(arrowFunction)).toEqual(true);
      expect(Comparator.isFunction(functionExpression)).toEqual(true);
    });
  });

  describe('IsInstanceOf: ', () => {
    test('should compare non object', () => {
      let obj = 'str';
      expect(Comparator.isInstanceOf(obj, String)).toEqual(false);
    });

    test('should compare object', () => {
      class A {
        constructor(public name: string) {}
      }
      let obj = new A('str');
      expect(Comparator.isInstanceOf(obj, A)).toEqual(true);
    });
  });

  describe(`IsObject: `, () => {
    test('should compare non object', () => {
      let obj = 'str';
      expect(Comparator.isObject(obj)).toEqual(false);
    });

    test('should compare object', () => {
      let obj = {};
      expect(Comparator.isObject(obj)).toEqual(true);
    });
  });

  describe(`IsString: `, () => {
    test('should compare non string object', () => {
      let obj = 2;
      expect(Comparator.isString(obj)).toEqual(false);
    });

    test('should compare string', () => {
      let obj = 'str';
      expect(Comparator.isString(obj)).toEqual(true);
    });
  });

  describe(`IsDate: `, () => {
    test('should compare non date object', () => {
      let obj = 'str';
      expect(Comparator.isDate(obj)).toEqual(false);
    });

    test('should compare date object', () => {
      let obj = new Date();
      expect(Comparator.isDate(obj)).toEqual(true);
    });

    test('should detect not valid date object', () => {
      let obj = new Date('foo');
      expect(Comparator.isDate(obj)).toEqual(false);
    });
  });

  describe(`IsInteger: `, () => {
    test('should compare non integer object', () => {
      let obj = 'str';
      expect(Comparator.isInteger(obj)).toEqual(false);
    });

    test('should compare integer', () => {
      let obj = 2;
      expect(Comparator.isInteger(obj)).toEqual(true);
    });

    test('should not be confused with other numbers', () => {
      let obj = 2.2;
      expect(Comparator.isInteger(obj)).toEqual(false);
    });
  });

  describe(`IsNumber: `, () => {
    test('should compare non number object', () => {
      let obj = 'str';
      expect(Comparator.isNumber(obj)).toEqual(false);
    });

    test('should compare number', () => {
      let obj = 2;
      expect(Comparator.isNumber(obj)).toEqual(true);
    });

    test('should compare number as string', () => {
      let obj = '2';
      expect(Comparator.isNumber(obj)).toEqual(false);
    });
  });

  describe(`IsBoolean: `, () => {
    test('should compare non boolean object', () => {
      let obj = 'str';
      expect(Comparator.isBoolean(obj)).toEqual(false);
    });

    test('should compare boolean', () => {
      expect(Comparator.isBoolean(true)).toEqual(true);
      expect(Comparator.isBoolean(false)).toEqual(true);
    });
  });

  describe(`IsArray: `, () => {
    test('should compare non array object', () => {
      let obj = 'str';
      expect(Comparator.isArray(obj)).toEqual(false);
    });

    test('should compare array object', () => {
      expect(Comparator.isArray([])).toEqual(true);
      expect(Comparator.isArray([1, 2])).toEqual(true);
    });
  });

  describe(`IsSet: `, () => {
    test('should compare empty non Set item', () => {
      expect(Comparator.isSet(new Map())).toEqual(false);
    });

    test('should compare empty Set', () => {
      expect(Comparator.isSet(new Set())).toEqual(true);
    });

    test('should compare Set', () => {
      let set = new Set<string>(['a']);
      expect(Comparator.isSet(set)).toEqual(true);
    });
  });

  describe(`IsMap: `, () => {
    test('should compare empty non Map item', () => {
      expect(Comparator.isMap(new Set())).toEqual(false);
    });

    test('should compare empty Map', () => {
      expect(Comparator.isMap(new Map())).toEqual(true);
    });

    test('should compare Map', () => {
      let set = new Map([[1, 'one']]);
      expect(Comparator.isMap(set)).toEqual(true);
    });
  });

  describe(`IsEnum: `, () => {
    enum SampleEnum {
      a = '1',
      b = '2'
    }

    test('should compare non enum object', () => {
      expect(Comparator.isEnum('a', SampleEnum)).toEqual(false);
      expect(Comparator.isEnum('c', SampleEnum)).toEqual(false);
    });

    test('should compare enum', () => {
      expect(Comparator.isEnum(SampleEnum.a, SampleEnum)).toEqual(true);
    });
  });

  describe(`IsEmptyObject: `, () => {
    test('should compare non object variable', () => {
      let obj = 'str';
      expect(Comparator.isEmptyObject(obj)).toEqual(false);
    });

    test('should compare is object has properties or not', () => {
      expect(Comparator.isEmptyObject({})).toEqual(true);
      expect(Comparator.isEmptyObject({ a: 1 })).toEqual(false);
    });
  });

  describe(`HasProperty: `, () => {
    test('should compare non object variable', () => {
      let obj = 'str';
      expect(Comparator.hasProperty(obj, 'test')).toEqual(false);
    });

    test('should compare is object has properties or not', () => {
      expect(Comparator.hasProperty({}, 'test')).toEqual(false);
      expect(Comparator.hasProperty({ test: 1 }, 'test')).toEqual(true);
      expect(Comparator.hasProperty({ test: undefined }, 'test')).toEqual(true);
    });

    test('should be able to detect getter setter properties', () => {
      class Foo {
        private _x = 10;
        get x(): number {
          return this._x;
        }
        set x(value: number) {
          this._x = value;
        }
      }

      let obj = new Foo();
      expect(Comparator.hasProperty(obj, 'x')).toEqual(true);
    });

    test('should be able to detect inherited getter setter properties', () => {
      class Parent {
        private _x = 10;
        get x(): number {
          return this._x;
        }
        set x(value: number) {
          this._x = value;
        }
      }

      class Foo extends Parent {}

      let obj = new Foo();
      expect(Comparator.hasProperty(obj, 'x')).toEqual(true);
    });
  });

  describe(`IsEqual: `, () => {
    test('should compare two empty values', () => {
      expect(Comparator.isEqual(undefined, undefined)).toEqual(true);
      expect(Comparator.isEqual(undefined, '')).toEqual(false);
      expect(Comparator.isEqual(undefined, 0)).toEqual(false);
      expect(Comparator.isEqual(undefined, false)).toEqual(false);

      expect(Comparator.isEqual(null, null)).toEqual(true);
      expect(Comparator.isEqual(null, '')).toEqual(false);
      expect(Comparator.isEqual(null, 0)).toEqual(false);
      expect(Comparator.isEqual(null, false)).toEqual(false);
    });

    test('should return false with comparison between empty value and nonempty value', () => {
      expect(Comparator.isEqual(undefined, 'str')).toEqual(false);
      expect(Comparator.isEqual(undefined, 10)).toEqual(false);
      expect(Comparator.isEqual(undefined, true)).toEqual(false);
      expect(Comparator.isEqual(undefined, [])).toEqual(false);
      expect(Comparator.isEqual(undefined, {})).toEqual(false);

      expect(Comparator.isEqual(null, 'str')).toEqual(false);
      expect(Comparator.isEqual(null, 10)).toEqual(false);
      expect(Comparator.isEqual(null, true)).toEqual(false);
      expect(Comparator.isEqual(null, [])).toEqual(false);
      expect(Comparator.isEqual(null, {})).toEqual(false);
    });

    test('should compare primitive types', () => {
      expect(Comparator.isEqual('', '')).toEqual(true);
      expect(Comparator.isEqual('str', 'str')).toEqual(true);
      expect(Comparator.isEqual('s1', 's2')).toEqual(false);

      expect(Comparator.isEqual(0, 0)).toEqual(true);
      expect(Comparator.isEqual(1, 1)).toEqual(true);
      expect(Comparator.isEqual(0, 1)).toEqual(false);

      expect(Comparator.isEqual(false, false)).toEqual(true);
      expect(Comparator.isEqual(true, true)).toEqual(true);
      expect(Comparator.isEqual(false, true)).toEqual(false);
    });

    test('should compare type mixes', () => {
      expect(Comparator.isEqual('', 0)).toEqual(false);
      expect(Comparator.isEqual('', false)).toEqual(false);
      expect(Comparator.isEqual(0, false)).toEqual(false);
      expect(Comparator.isEqual('', [])).toEqual(false);
      expect(Comparator.isEqual('', {})).toEqual(false);

      expect(Comparator.isEqual('0', 0)).toEqual(false);
      expect(Comparator.isEqual('1', 1)).toEqual(false);
      expect(Comparator.isEqual('false', false)).toEqual(false);
      expect(Comparator.isEqual('true', true)).toEqual(false);

      expect(Comparator.isEqual('[]', [])).toEqual(false);
      expect(Comparator.isEqual('{}', {})).toEqual(false);
      expect(Comparator.isEqual('[1]', [1])).toEqual(false);
      expect(Comparator.isEqual('{a: 1}', { a: 1 })).toEqual(false);
    });

    test('should compare arrays', () => {
      expect(Comparator.isEqual([], [])).toEqual(true);
      expect(Comparator.isEqual([1], [1])).toEqual(true);
      expect(Comparator.isEqual([1, 2], [2, 1])).toEqual(false);
      expect(Comparator.isEqual([], [1])).toEqual(false);
      expect(Comparator.isEqual(['1'], [1])).toEqual(false);
    });

    test('should compare sets', () => {
      expect(Comparator.isEqual(new Set(), new Set())).toEqual(true);
      expect(Comparator.isEqual(new Set(), new Set(['a']))).toEqual(false);
      expect(Comparator.isEqual(new Set(['b']), new Set(['a']))).toEqual(false);
      expect(Comparator.isEqual(new Set(['a']), new Set(['a']))).toEqual(true);
      expect(Comparator.isEqual(['a'], new Set(['a']))).toEqual(false);
    });

    test('should compare maps', () => {
      expect(Comparator.isEqual(new Map(), new Map())).toEqual(true);
      expect(Comparator.isEqual(new Map(), new Map([[1, 'one']]))).toEqual(false);
      expect(Comparator.isEqual(new Map([[2, 'two']]), new Map([[1, 'one']]))).toEqual(false);
      expect(Comparator.isEqual(new Map([[1, 'one']]), new Map([[1, 'one']]))).toEqual(true);
      expect(Comparator.isEqual([[1, 'one']], new Map([[1, 'one']]))).toEqual(false);
    });

    test('should compare objects deeply', () => {
      expect(Comparator.isEqual({}, {})).toEqual(true);
      expect(Comparator.isEqual({ a: 1 }, { a: 1 })).toEqual(true);
      expect(Comparator.isEqual({ a: [1] }, { a: [1] })).toEqual(true);
      expect(Comparator.isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toEqual(true);

      expect(Comparator.isEqual({}, { a: 1 })).toEqual(false);
      expect(Comparator.isEqual({ a: '1' }, { a: 1 })).toEqual(false);
      expect(Comparator.isEqual({ a: ['1'] }, { a: [1] })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: '1' } }, { a: { b: 1 } })).toEqual(false);
    });

    test('should compare objects deeply with Sets', () => {
      expect(Comparator.isEqual({ a: { b: new Set(['a']) } }, { a: { b: ['a'] } })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: new Set(['a']) } }, { a: { b: new Set(['a']) } })).toEqual(true);
    });

    test('should compare objects deeply with Sets that contains objects', () => {
      expect(Comparator.isEqual({ a: { b: new Set([{ a: 'a' }]) } }, { a: { b: new Set([{ a: 'b' }]) } })).toEqual(
        false
      );
      expect(Comparator.isEqual({ a: { b: new Set([{ a: 'a' }]) } }, { a: { b: new Set([{ a: 'a' }]) } })).toEqual(
        true
      );
    });

    test('should compare objects deeply with Maps', () => {
      expect(Comparator.isEqual({ a: { b: new Map([[1, 'one']]) } }, { a: { b: [[1, 'one']] } })).toEqual(false);
      expect(
        Comparator.isEqual(
          { a: { b: new Map([[1, 'one']]) } },
          {
            a: {
              b: new Map([
                [1, 'one'],
                [2, 'two']
              ])
            }
          }
        )
      ).toEqual(false);
      expect(Comparator.isEqual({ a: { b: new Map([[1, 'one']]) } }, { a: { b: new Map([[1, 'one']]) } })).toEqual(
        true
      );
    });

    test('should compare objects deeply with Maps that contains objects', () => {
      expect(
        Comparator.isEqual({ a: { b: new Map([[1, { a: 'a' }]]) } }, { a: { b: new Map([[1, { a: 'b' }]]) } })
      ).toEqual(false);
      expect(
        Comparator.isEqual({ a: { b: new Map([[1, { a: 'a' }]]) } }, { a: { b: new Map([[1, { a: 'a' }]]) } })
      ).toEqual(true);
    });

    test('should compare objects deeply with Dates', () => {
      expect(Comparator.isEqual({ a: { b: new Date(1) } }, { a: { b: new Date(1000000) } })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: new Date(1) } }, { a: { b: new Date(1) } })).toEqual(true);
    });
  });
});
