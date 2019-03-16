"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comparator_1 = require("./comparator");
describe("Comparator", function () {
    describe("isFunction", function () {
        it('should compare non function object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isFunction(obj)).toEqual(false);
        });
        it('should compare function', function () {
            var arrowFunction = function () { };
            var functionExpression = function () { };
            expect(comparator_1.Comparator.isFunction(arrowFunction)).toEqual(true);
            expect(comparator_1.Comparator.isFunction(functionExpression)).toEqual(true);
        });
    });
    describe("isObject", function () {
        it('should compare non object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isObject(obj)).toEqual(false);
        });
        it('should compare object', function () {
            var obj = {};
            expect(comparator_1.Comparator.isObject(obj)).toEqual(true);
        });
    });
    describe("isString", function () {
        it('should compare non string object', function () {
            var obj = 2;
            expect(comparator_1.Comparator.isString(obj)).toEqual(false);
        });
        it('should compare string', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isString(obj)).toEqual(true);
        });
    });
    describe("isDate", function () {
        it('should compare non date object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isDate(obj)).toEqual(false);
        });
        it('should compare date object', function () {
            var obj = new Date();
            expect(comparator_1.Comparator.isDate(obj)).toEqual(true);
        });
        it('should detect not valid date object', function () {
            var obj = new Date('foo');
            expect(comparator_1.Comparator.isDate(obj)).toEqual(false);
        });
    });
    describe("isInteger", function () {
        it('should compare non integer object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isInteger(obj)).toEqual(false);
        });
        it('should compare integer', function () {
            var obj = 2;
            expect(comparator_1.Comparator.isInteger(obj)).toEqual(true);
        });
        it('should not be confused with other numbers', function () {
            var obj = 2.2;
            expect(comparator_1.Comparator.isInteger(obj)).toEqual(false);
        });
    });
    describe("isNumber", function () {
        it('should compare non number object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isNumber(obj)).toEqual(false);
        });
        it('should compare number', function () {
            var obj = 2;
            expect(comparator_1.Comparator.isNumber(obj)).toEqual(true);
        });
    });
    describe("isBoolean", function () {
        it('should compare non boolean object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isBoolean(obj)).toEqual(false);
        });
        it('should compare boolean', function () {
            expect(comparator_1.Comparator.isBoolean(true)).toEqual(true);
            expect(comparator_1.Comparator.isBoolean(false)).toEqual(true);
        });
    });
    describe("isArray", function () {
        it('should compare non array object', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isArray(obj)).toEqual(false);
        });
        it('should compare array object', function () {
            expect(comparator_1.Comparator.isArray([])).toEqual(true);
            expect(comparator_1.Comparator.isArray([1, 2])).toEqual(true);
        });
    });
    describe("isSet", function () {
        it('should compare empty non Set item', function () {
            expect(comparator_1.Comparator.isSet(new Map())).toEqual(false);
        });
        it('should compare empty Set', function () {
            expect(comparator_1.Comparator.isSet(new Set())).toEqual(true);
        });
        it('should compare Set', function () {
            var set = new Set(['a']);
            expect(comparator_1.Comparator.isSet(set)).toEqual(true);
        });
    });
    describe("isMap", function () {
        it('should compare empty non Map item', function () {
            expect(comparator_1.Comparator.isMap(new Set())).toEqual(false);
        });
        it('should compare empty Map', function () {
            expect(comparator_1.Comparator.isMap(new Map())).toEqual(true);
        });
        it('should compare Map', function () {
            var set = new Map([[1, 'one']]);
            expect(comparator_1.Comparator.isMap(set)).toEqual(true);
        });
    });
    describe("isEnum", function () {
        var SampleEnum;
        (function (SampleEnum) {
            SampleEnum["a"] = "1";
            SampleEnum["b"] = "2";
        })(SampleEnum || (SampleEnum = {}));
        it('should compare non enum object', function () {
            expect(comparator_1.Comparator.isEnum('a', SampleEnum)).toEqual(false);
            expect(comparator_1.Comparator.isEnum('c', SampleEnum)).toEqual(false);
        });
        it('should compare enum', function () {
            expect(comparator_1.Comparator.isEnum(SampleEnum.a, SampleEnum)).toEqual(true);
        });
    });
    describe("isEmptyObject", function () {
        it('should compare non object variable', function () {
            var obj = 'str';
            expect(comparator_1.Comparator.isEmptyObject(obj)).toEqual(false);
        });
        it('should compare is object has properties or not', function () {
            expect(comparator_1.Comparator.isEmptyObject({})).toEqual(true);
            expect(comparator_1.Comparator.isEmptyObject({ a: 1 })).toEqual(false);
        });
    });
    describe("isEqual", function () {
        it('should compare two empty values', function () {
            expect(comparator_1.Comparator.isEqual(undefined, undefined)).toEqual(true);
            expect(comparator_1.Comparator.isEqual(undefined, '')).toEqual(false);
            expect(comparator_1.Comparator.isEqual(undefined, 0)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(undefined, false)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, null)).toEqual(true);
            expect(comparator_1.Comparator.isEqual(null, '')).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, 0)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, false)).toEqual(false);
        });
        it('should return false with comparison between empty value and nonempty value', function () {
            expect(comparator_1.Comparator.isEqual(undefined, 'str')).toEqual(false);
            expect(comparator_1.Comparator.isEqual(undefined, 10)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(undefined, true)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(undefined, [])).toEqual(false);
            expect(comparator_1.Comparator.isEqual(undefined, {})).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, 'str')).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, 10)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, true)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, [])).toEqual(false);
            expect(comparator_1.Comparator.isEqual(null, {})).toEqual(false);
        });
        it('should compare primitive types', function () {
            expect(comparator_1.Comparator.isEqual('', '')).toEqual(true);
            expect(comparator_1.Comparator.isEqual('str', 'str')).toEqual(true);
            expect(comparator_1.Comparator.isEqual('s1', 's2')).toEqual(false);
            expect(comparator_1.Comparator.isEqual(0, 0)).toEqual(true);
            expect(comparator_1.Comparator.isEqual(1, 1)).toEqual(true);
            expect(comparator_1.Comparator.isEqual(0, 1)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(false, false)).toEqual(true);
            expect(comparator_1.Comparator.isEqual(true, true)).toEqual(true);
            expect(comparator_1.Comparator.isEqual(false, true)).toEqual(false);
        });
        it('should compare type mixes', function () {
            expect(comparator_1.Comparator.isEqual('', 0)).toEqual(false);
            expect(comparator_1.Comparator.isEqual('', false)).toEqual(false);
            expect(comparator_1.Comparator.isEqual(0, false)).toEqual(false);
            expect(comparator_1.Comparator.isEqual('', [])).toEqual(false);
            expect(comparator_1.Comparator.isEqual('', {})).toEqual(false);
            expect(comparator_1.Comparator.isEqual('0', 0)).toEqual(false);
            expect(comparator_1.Comparator.isEqual('1', 1)).toEqual(false);
            expect(comparator_1.Comparator.isEqual('false', false)).toEqual(false);
            expect(comparator_1.Comparator.isEqual('true', true)).toEqual(false);
            expect(comparator_1.Comparator.isEqual('[]', [])).toEqual(false);
            expect(comparator_1.Comparator.isEqual('{}', {})).toEqual(false);
            expect(comparator_1.Comparator.isEqual('[1]', [1])).toEqual(false);
            expect(comparator_1.Comparator.isEqual('{a: 1}', { a: 1 })).toEqual(false);
        });
        it('should compare arrays', function () {
            expect(comparator_1.Comparator.isEqual([], [])).toEqual(true);
            expect(comparator_1.Comparator.isEqual([1], [1])).toEqual(true);
            expect(comparator_1.Comparator.isEqual([], [1])).toEqual(false);
            expect(comparator_1.Comparator.isEqual(['1'], [1])).toEqual(false);
        });
        it('should compare sets', function () {
            expect(comparator_1.Comparator.isEqual(new Set(), new Set())).toEqual(true);
            expect(comparator_1.Comparator.isEqual(new Set(), new Set(['a']))).toEqual(false);
            expect(comparator_1.Comparator.isEqual(new Set(['b']), new Set(['a']))).toEqual(false);
            expect(comparator_1.Comparator.isEqual(new Set(['a']), new Set(['a']))).toEqual(true);
            expect(comparator_1.Comparator.isEqual(['a'], new Set(['a']))).toEqual(false);
        });
        it('should compare maps', function () {
            expect(comparator_1.Comparator.isEqual(new Map(), new Map())).toEqual(true);
            expect(comparator_1.Comparator.isEqual(new Map(), new Map([[1, 'one']]))).toEqual(false);
            expect(comparator_1.Comparator.isEqual(new Map([[2, 'two']]), new Map([[1, 'one']]))).toEqual(false);
            expect(comparator_1.Comparator.isEqual(new Map([[1, 'one']]), new Map([[1, 'one']]))).toEqual(true);
            expect(comparator_1.Comparator.isEqual([[1, 'one']], new Map([[1, 'one']]))).toEqual(false);
        });
        it('should compare objects deeply', function () {
            expect(comparator_1.Comparator.isEqual({}, {})).toEqual(true);
            expect(comparator_1.Comparator.isEqual({ a: 1 }, { a: 1 })).toEqual(true);
            expect(comparator_1.Comparator.isEqual({ a: [1] }, { a: [1] })).toEqual(true);
            expect(comparator_1.Comparator.isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toEqual(true);
            expect(comparator_1.Comparator.isEqual({}, { a: 1 })).toEqual(false);
            expect(comparator_1.Comparator.isEqual({ a: '1' }, { a: 1 })).toEqual(false);
            expect(comparator_1.Comparator.isEqual({ a: ['1'] }, { a: [1] })).toEqual(false);
            expect(comparator_1.Comparator.isEqual({ a: { b: '1' } }, { a: { b: 1 } })).toEqual(false);
        });
        it('should compare objects deeply with Sets', function () {
            expect(comparator_1.Comparator.isEqual({ a: { b: new Set(['a']) } }, { a: { b: ['a'] } })).toEqual(false);
            expect(comparator_1.Comparator.isEqual({ a: { b: new Set(['a']) } }, { a: { b: new Set(['a']) } })).toEqual(true);
        });
        it('should compare objects deeply with Maps', function () {
            expect(comparator_1.Comparator.isEqual({ a: { b: new Map([[1, 'one']]) } }, { a: { b: [[1, 'one']] } })).toEqual(false);
            expect(comparator_1.Comparator.isEqual({ a: { b: new Map([[1, 'one']]) } }, { a: { b: new Map([[1, 'one']]) } })).toEqual(true);
        });
    });
});
