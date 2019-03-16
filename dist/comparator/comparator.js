"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparator = /** @class */ (function () {
    function Comparator() {
    }
    Comparator.isFunction = function (fn) {
        return typeof fn === 'function';
    };
    Comparator.isObject = function (a) {
        return a && typeof a === 'object';
    };
    Comparator.isString = function (a) {
        return typeof a === 'string';
    };
    Comparator.isDate = function (a) {
        return a instanceof Date && !isNaN(a.getTime());
    };
    Comparator.isInteger = function (a) {
        return Number.isInteger(a);
    };
    Comparator.isNumber = function (a) {
        return !isNaN(a);
    };
    Comparator.isBoolean = function (a) {
        return typeof a === 'boolean';
    };
    Comparator.isArray = function (a) {
        return Array.isArray(a);
    };
    Comparator.isSet = function (a) {
        return a instanceof Set;
    };
    Comparator.isMap = function (a) {
        return a instanceof Map;
    };
    Comparator.isEnum = function (value, enumType) {
        return Object.values(enumType).includes(value);
    };
    Comparator.isEmptyObject = function (obj) {
        return Comparator.isObject(obj) && Object.keys(obj).length === 0;
    };
    Comparator.isEqual = function (a, b) {
        if (a === b) {
            return true;
        }
        else if (Comparator.isArray(a) || Comparator.isArray(b)) {
            if (Comparator.isArray(a) && Comparator.isArray(b) && a.length === b.length) {
                var equal = true;
                for (var index in a) {
                    if (!Comparator.isEqual(a[index], b[index])) {
                        equal = false;
                    }
                }
                return equal;
            }
            else {
                return false;
            }
        }
        else if (Comparator.isSet(a) || Comparator.isSet(b)) {
            if (Comparator.isSet(a) && Comparator.isSet(b) && a.size === b.size) {
                var equal_1 = true;
                a.forEach(function (item) {
                    if (!b.has(item)) {
                        equal_1 = false;
                    }
                });
                return equal_1;
            }
            else {
                return false;
            }
        }
        else if (Comparator.isMap(a) || Comparator.isMap(b)) {
            if (Comparator.isMap(a) && Comparator.isMap(b) && a.size === b.size) {
                var equal_2 = true;
                a.forEach(function (value, key) {
                    if (!Comparator.isEqual(value, b.get(key))) {
                        equal_2 = false;
                    }
                });
                return equal_2;
            }
            else {
                return false;
            }
        }
        else if (Comparator.isObject(a) && Comparator.isObject(b)) {
            if (Object.keys(a).length === Object.keys(b).length) {
                var equal = true;
                for (var index in a) {
                    if (!Comparator.isEqual(a[index], b[index])) {
                        equal = false;
                    }
                }
                return equal;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    return Comparator;
}());
exports.Comparator = Comparator;
