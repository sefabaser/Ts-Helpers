"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: unit tests
var FunctionDelayer = /** @class */ (function () {
    function FunctionDelayer(delay) {
        if (delay === void 0) { delay = 200; }
        this.delay = delay;
    }
    FunctionDelayer.prototype.call = function (callback) {
        var _this = this;
        this.halt();
        this.delayerTimeout = setTimeout(function () {
            _this.delayerTimeout = undefined;
            callback();
        }, this.delay);
    };
    FunctionDelayer.prototype.halt = function () {
        this.delayerTimeout && clearTimeout(this.delayerTimeout);
    };
    return FunctionDelayer;
}());
exports.FunctionDelayer = FunctionDelayer;
