"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid = /** @class */ (function () {
    function Guid(guid) {
        this.guid = guid;
    }
    Guid.next = function () {
        var guid = '';
        var i;
        var j;
        for (j = 0; j < 32; j++) {
            if (j === 8 || j === 12 || j === 16 || j === 20) {
                guid += '-';
            }
            i = Math.floor(Math.random() * 16)
                .toString(16)
                .toUpperCase();
            guid += i;
        }
        return new Guid(guid);
    };
    Guid.prototype.toString = function () {
        return this.guid;
    };
    return Guid;
}());
exports.Guid = Guid;
