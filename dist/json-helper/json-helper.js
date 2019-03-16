"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsonHelper = /** @class */ (function () {
    function JsonHelper() {
    }
    JsonHelper.deepFind = function (obj, path) {
        if (!path) {
            return obj;
        }
        else {
            while (path.indexOf('[') >= 0) {
                var startIndex = path.indexOf('[');
                var endIndex = path.indexOf(']');
                if (endIndex === -1) {
                    return undefined;
                }
                else {
                    path = "" + path.substring(0, endIndex) + path.substring(endIndex + 1);
                    path = path.substring(0, startIndex) + "." + path.substring(startIndex + 1);
                }
            }
            var paths = path.split('.');
            var current_1 = obj;
            paths.forEach(function (currentPath) {
                current_1 = (current_1 && current_1[currentPath]) || undefined;
            });
            return current_1;
        }
    };
    JsonHelper.deepCopy = function (target) {
        if (target === null) {
            return target;
        }
        if (target instanceof Date) {
            return new Date(target.getTime());
        }
        if (target instanceof Array) {
            var cp_1 = [];
            target.forEach(function (v) {
                cp_1.push(v);
            });
            return cp_1.map(function (n) { return JsonHelper.deepCopy(n); });
        }
        if (target instanceof Set) {
            var cp_2 = new Set();
            target.forEach(function (v) {
                cp_2.add(JsonHelper.deepCopy(v));
            });
            return cp_2;
        }
        if (target instanceof Map) {
            var cp_3 = new Map();
            target.forEach(function (v, k) {
                cp_3.set(k, JsonHelper.deepCopy(v));
            });
            return cp_3;
        }
        if (typeof target === 'object' && target !== {}) {
            var cp_4 = __assign({}, target);
            Object.keys(cp_4).forEach(function (k) {
                cp_4[k] = JsonHelper.deepCopy(cp_4[k]);
            });
            return cp_4;
        }
        return target;
    };
    JsonHelper.mergeMaps = function (map1, map2) {
        return new Map(Array.from(map1.entries()).concat(Array.from(map2.entries())));
    };
    return JsonHelper;
}());
exports.JsonHelper = JsonHelper;
