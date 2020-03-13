"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Formatter {
    static toArrayBuffer(buffer) {
        const bufferLen = buffer.length || 0;
        const arrayBuffer = new ArrayBuffer(bufferLen);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < bufferLen; ++i) {
            view[i] = buffer[i];
        }
        return arrayBuffer;
    }
}
exports.default = Formatter;
//# sourceMappingURL=Formatter.js.map