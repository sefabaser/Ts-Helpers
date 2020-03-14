import { Comparator } from './comparator';

describe(`Comparator`, () => {
  describe(`isFunction`, () => {
    it('should compare non function object', () => {
      let obj = 'str';
      expect(Comparator.isFunction(obj)).toEqual(false);
    });

    it('should compare function', () => {
      let arrowFunction = () => {};
      let functionExpression = function() {};
      expect(Comparator.isFunction(arrowFunction)).toEqual(true);
      expect(Comparator.isFunction(functionExpression)).toEqual(true);
    });
  });

  describe(`isObject`, () => {
    it('should compare non object', () => {
      let obj = 'str';
      expect(Comparator.isObject(obj)).toEqual(false);
    });

    it('should compare object', () => {
      let obj = {};
      expect(Comparator.isObject(obj)).toEqual(true);
    });
  });

  describe(`isObservable`, () => {
    it('should compare non observable object', () => {
      let obj = 'str';
      expect(Comparator.isObservable(obj)).toEqual(false);
    });
  });

  describe(`isString`, () => {
    it('should compare non string object', () => {
      let obj = 2;
      expect(Comparator.isString(obj)).toEqual(false);
    });

    it('should compare string', () => {
      let obj = 'str';
      expect(Comparator.isString(obj)).toEqual(true);
    });
  });

  describe(`isDate`, () => {
    it('should compare non date object', () => {
      let obj = 'str';
      expect(Comparator.isDate(obj)).toEqual(false);
    });

    it('should compare date object', () => {
      let obj = new Date();
      expect(Comparator.isDate(obj)).toEqual(true);
    });

    it('should detect not valid date object', () => {
      let obj = new Date('foo');
      expect(Comparator.isDate(obj)).toEqual(false);
    });
  });

  describe(`isInteger`, () => {
    it('should compare non integer object', () => {
      let obj = 'str';
      expect(Comparator.isInteger(obj)).toEqual(false);
    });

    it('should compare integer', () => {
      let obj = 2;
      expect(Comparator.isInteger(obj)).toEqual(true);
    });

    it('should not be confused with other numbers', () => {
      let obj = 2.2;
      expect(Comparator.isInteger(obj)).toEqual(false);
    });
  });

  describe(`isNumber`, () => {
    it('should compare non number object', () => {
      let obj = 'str';
      expect(Comparator.isNumber(obj)).toEqual(false);
    });

    it('should compare number', () => {
      let obj = 2;
      expect(Comparator.isNumber(obj)).toEqual(true);
    });

    it('should compare number as string', () => {
      let obj = '2';
      expect(Comparator.isNumber(obj)).toEqual(false);
    });
  });

  describe(`isBoolean`, () => {
    it('should compare non boolean object', () => {
      let obj = 'str';
      expect(Comparator.isBoolean(obj)).toEqual(false);
    });

    it('should compare boolean', () => {
      expect(Comparator.isBoolean(true)).toEqual(true);
      expect(Comparator.isBoolean(false)).toEqual(true);
    });
  });

  describe(`isArray`, () => {
    it('should compare non array object', () => {
      let obj = 'str';
      expect(Comparator.isArray(obj)).toEqual(false);
    });

    it('should compare array object', () => {
      expect(Comparator.isArray([])).toEqual(true);
      expect(Comparator.isArray([1, 2])).toEqual(true);
    });
  });

  describe(`isSet`, () => {
    it('should compare empty non Set item', () => {
      expect(Comparator.isSet(new Map())).toEqual(false);
    });

    it('should compare empty Set', () => {
      expect(Comparator.isSet(new Set())).toEqual(true);
    });

    it('should compare Set', () => {
      let set = new Set<string>(['a']);
      expect(Comparator.isSet(set)).toEqual(true);
    });
  });

  describe(`isMap`, () => {
    it('should compare empty non Map item', () => {
      expect(Comparator.isMap(new Set())).toEqual(false);
    });

    it('should compare empty Map', () => {
      expect(Comparator.isMap(new Map())).toEqual(true);
    });

    it('should compare Map', () => {
      let set = new Map([[1, 'one']]);
      expect(Comparator.isMap(set)).toEqual(true);
    });
  });

  describe(`isEnum`, () => {
    enum SampleEnum {
      a = '1',
      b = '2'
    }

    it('should compare non enum object', () => {
      expect(Comparator.isEnum('a', SampleEnum)).toEqual(false);
      expect(Comparator.isEnum('c', SampleEnum)).toEqual(false);
    });

    it('should compare enum', () => {
      expect(Comparator.isEnum(SampleEnum.a, SampleEnum)).toEqual(true);
    });
  });

  describe(`isEmptyObject`, () => {
    it('should compare non object variable', () => {
      let obj = 'str';
      expect(Comparator.isEmptyObject(obj)).toEqual(false);
    });

    it('should compare is object has properties or not', () => {
      expect(Comparator.isEmptyObject({})).toEqual(true);
      expect(Comparator.isEmptyObject({ a: 1 })).toEqual(false);
    });
  });

  describe(`isEqual`, () => {
    it('should compare two empty values', () => {
      expect(Comparator.isEqual(undefined, undefined)).toEqual(true);
      expect(Comparator.isEqual(undefined, '')).toEqual(false);
      expect(Comparator.isEqual(undefined, 0)).toEqual(false);
      expect(Comparator.isEqual(undefined, false)).toEqual(false);

      expect(Comparator.isEqual(null, null)).toEqual(true);
      expect(Comparator.isEqual(null, '')).toEqual(false);
      expect(Comparator.isEqual(null, 0)).toEqual(false);
      expect(Comparator.isEqual(null, false)).toEqual(false);
    });

    it('should return false with comparison between empty value and nonempty value', () => {
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

    it('should compare primitive types', () => {
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

    it('should compare type mixes', () => {
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

    it('should compare arrays', () => {
      expect(Comparator.isEqual([], [])).toEqual(true);
      expect(Comparator.isEqual([1], [1])).toEqual(true);
      expect(Comparator.isEqual([], [1])).toEqual(false);
      expect(Comparator.isEqual(['1'], [1])).toEqual(false);
    });

    it('should compare sets', () => {
      expect(Comparator.isEqual(new Set(), new Set())).toEqual(true);
      expect(Comparator.isEqual(new Set(), new Set(['a']))).toEqual(false);
      expect(Comparator.isEqual(new Set(['b']), new Set(['a']))).toEqual(false);
      expect(Comparator.isEqual(new Set(['a']), new Set(['a']))).toEqual(true);
      expect(Comparator.isEqual(['a'], new Set(['a']))).toEqual(false);
    });

    it('should compare maps', () => {
      expect(Comparator.isEqual(new Map(), new Map())).toEqual(true);
      expect(Comparator.isEqual(new Map(), new Map([[1, 'one']]))).toEqual(false);
      expect(Comparator.isEqual(new Map([[2, 'two']]), new Map([[1, 'one']]))).toEqual(false);
      expect(Comparator.isEqual(new Map([[1, 'one']]), new Map([[1, 'one']]))).toEqual(true);
      expect(Comparator.isEqual([[1, 'one']], new Map([[1, 'one']]))).toEqual(false);
    });

    it('should compare objects deeply', () => {
      expect(Comparator.isEqual({}, {})).toEqual(true);
      expect(Comparator.isEqual({ a: 1 }, { a: 1 })).toEqual(true);
      expect(Comparator.isEqual({ a: [1] }, { a: [1] })).toEqual(true);
      expect(Comparator.isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toEqual(true);

      expect(Comparator.isEqual({}, { a: 1 })).toEqual(false);
      expect(Comparator.isEqual({ a: '1' }, { a: 1 })).toEqual(false);
      expect(Comparator.isEqual({ a: ['1'] }, { a: [1] })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: '1' } }, { a: { b: 1 } })).toEqual(false);
    });

    it('should compare objects deeply with Sets', () => {
      expect(Comparator.isEqual({ a: { b: new Set(['a']) } }, { a: { b: ['a'] } })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: new Set(['a']) } }, { a: { b: new Set(['a']) } })).toEqual(true);
    });

    it('should compare objects deeply with Maps', () => {
      expect(Comparator.isEqual({ a: { b: new Map([[1, 'one']]) } }, { a: { b: [[1, 'one']] } })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: new Map([[1, 'one']]) } }, { a: { b: new Map([[1, 'one']]) } })).toEqual(true);
    });

    it('should compare objects deeply with Dates', () => {
      expect(Comparator.isEqual({ a: { b: new Date(1) } }, { a: { b: new Date(1000000) } })).toEqual(false);
      expect(Comparator.isEqual({ a: { b: new Date(1) } }, { a: { b: new Date(1) } })).toEqual(true);
    });
  });
});
