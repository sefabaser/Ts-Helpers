"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_helper_1 = require("./json-helper");
describe("Json Helper", function () {
    describe("Deep Find", function () {
        it('should not break with undefined object', function () {
            expect(json_helper_1.JsonHelper.deepFind(undefined, 'a.b')).toBeUndefined();
        });
        it('should return undefined with primitive types', function () {
            expect(json_helper_1.JsonHelper.deepFind('str', 'a.b')).toBeUndefined();
            expect(json_helper_1.JsonHelper.deepFind(1, 'a.b')).toBeUndefined();
            expect(json_helper_1.JsonHelper.deepFind(true, 'a.b')).toBeUndefined();
        });
        it('should return the object with empty path', function () {
            var object = { a: 1 };
            expect(json_helper_1.JsonHelper.deepFind(object, '')).toEqual(object);
        });
        it('should find one level deep properties', function () {
            var object = { a: 1 };
            expect(json_helper_1.JsonHelper.deepFind(object, 'a')).toEqual(1);
        });
        it('should find multiple level deep properties', function () {
            var object = { a: { b: { c: 1 } } };
            expect(json_helper_1.JsonHelper.deepFind(object, 'a.b.c')).toEqual(1);
        });
        it('should return undefined if the path is not pointing anything', function () {
            var object = { a: { b: 2 } };
            expect(json_helper_1.JsonHelper.deepFind(object, 'a.b.c')).toBeUndefined();
        });
        it('should support arrays', function () {
            var object = { a: [{ b: 1 }] };
            expect(json_helper_1.JsonHelper.deepFind(object, 'a[0].b')).toEqual(1);
        });
        it('should support nested arrays', function () {
            var object = { a: [[{ b: 1 }], [{ b: 2 }]] };
            expect(json_helper_1.JsonHelper.deepFind(object, 'a[1][0].b')).toEqual(2);
        });
        it('should return undefined with invalid array path', function () {
            var object = { a: [[{ b: 1 }], [{ b: 2 }]] };
            expect(json_helper_1.JsonHelper.deepFind(object, 'a[1][0.b')).toBeUndefined();
        });
    });
    describe("Deep Copy", function () {
        it('should work with primitive types', function () {
            var primitiveTypeSamples = [undefined, null, NaN, 0, 1, '', '0', 'false', 'true', 'str', true, false];
            primitiveTypeSamples.forEach(function (item) {
                var copy = json_helper_1.JsonHelper.deepCopy(item);
                expect(JSON.stringify(item)).toEqual(JSON.stringify(json_helper_1.JsonHelper.deepCopy(copy)));
            });
        });
        it('should deep copy objects', function () {
            var sampleObjects = [{}, { a: 1 }, { a: true }, { a: {} }, { a: { b: 1 } }];
            sampleObjects.forEach(function (item) {
                var copy = json_helper_1.JsonHelper.deepCopy(item);
                expect(JSON.stringify(item)).toEqual(JSON.stringify(json_helper_1.JsonHelper.deepCopy(copy)));
                expect(item !== copy).toEqual(true);
            });
        });
        it('should deep copy also inner objects', function () {
            var obj = { a: { b: { c: 1 } } };
            var copy = json_helper_1.JsonHelper.deepCopy(obj);
            expect(JSON.stringify(obj)).toEqual(JSON.stringify(json_helper_1.JsonHelper.deepCopy(copy)));
            expect(obj !== copy).toEqual(true);
            expect(obj.a !== copy.a).toEqual(true);
            expect(obj.a.b !== copy.a.b).toEqual(true);
        });
        it('should respect "Array" type', function () {
            var obj = { a: { b: [{ c: 1 }, { c: 2 }] } };
            var copy = json_helper_1.JsonHelper.deepCopy(obj);
            expect(JSON.stringify(obj)).toEqual(JSON.stringify(json_helper_1.JsonHelper.deepCopy(copy)));
            expect(obj !== copy).toEqual(true);
            expect(obj.a !== copy.a).toEqual(true);
            expect(obj.a.b !== copy.a.b).toEqual(true);
        });
        it('should respect "Set" type', function () {
            var obj = { a: { b: new Set(['a']) } };
            var copy = json_helper_1.JsonHelper.deepCopy(obj);
            expect(JSON.stringify(obj)).toEqual(JSON.stringify(json_helper_1.JsonHelper.deepCopy(copy)));
            expect(obj !== copy).toEqual(true);
            expect(obj.a !== copy.a).toEqual(true);
            expect(obj.a.b !== copy.a.b).toEqual(true);
            expect(copy.a.b.has('a')).toEqual(true);
        });
        it('should respect "Map" type', function () {
            var obj = { a: { b: new Map() } };
            obj.a.b.set('a', 'b');
            var copy = json_helper_1.JsonHelper.deepCopy(obj);
            expect(JSON.stringify(obj)).toEqual(JSON.stringify(json_helper_1.JsonHelper.deepCopy(copy)));
            expect(obj !== copy).toEqual(true);
            expect(obj.a !== copy.a).toEqual(true);
            expect(obj.a.b !== copy.a.b).toEqual(true);
            expect(copy.a.b.get('a')).toEqual('b');
        });
    });
    describe("Merge Maps", function () {
        it('should combines all entries of two maps', function () {
            var map1 = new Map();
            var map2 = new Map();
            map1.set('a', '1');
            map1.set('b', '2');
            map2.set('x', '3');
            map2.set('y', '4');
            var mergedMap = json_helper_1.JsonHelper.mergeMaps(map1, map2);
            expect(mergedMap.size).toEqual(4);
            expect(mergedMap.get('a')).toEqual('1');
            expect(mergedMap.get('b')).toEqual('2');
            expect(mergedMap.get('x')).toEqual('3');
            expect(mergedMap.get('y')).toEqual('4');
        });
    });
});
