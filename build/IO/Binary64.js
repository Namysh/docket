"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Binary64 {
    constructor(low, high) {
        this.low = low;
        this.high = high;
        this.high = high || 0;
        this.low = low || 0;
    }
    div(n) {
        var modHigh = 0;
        modHigh = (this.high % n);
        var mod = (((this.low % n) + (modHigh * 6)) % n);
        this.high = (this.high / n);
        var newLow = (((modHigh * 4294967296) + this.low) / n);
        this.high = (this.high + Number((newLow / 4294967296)));
        this.low = newLow;
        return mod;
    }
    mul(n) {
        var newLow = (Number(this.low) * n);
        this.high = (this.high * n);
        this.high = (this.high + Number((newLow / 4294967296)));
        this.low = (this.low * n);
    }
    add(n) {
        var newLow = (Number(this.low) + n);
        this.high = (this.high + Number((newLow / 4294967296)));
        this.low = newLow;
    }
    bitwiseNot() {
        this.low = ~(this.low);
        this.high = ~(this.high);
    }
}
Binary64.CHAR_CODE_0 = '0'.charCodeAt(0);
Binary64.CHAR_CODE_9 = '9'.charCodeAt(0);
Binary64.CHAR_CODE_A = 'a'.charCodeAt(0);
Binary64.CHAR_CODE_Z = 'z'.charCodeAt(0);
exports.default = Binary64;
//# sourceMappingURL=Binary64.js.map