"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ByteBoxOverflowError_1 = require("../Errors/BooleanByteWrapperErrors/ByteBoxOverflowError");
exports.setFlag = (byte, position, boolean) => {
    if (position > 7)
        throw new ByteBoxOverflowError_1.default(position);
    return (+boolean << position) | byte;
};
exports.getFlag = (byte, position) => {
    if (position > 7)
        throw new ByteBoxOverflowError_1.default(position);
    return !!(byte >> position);
};
//# sourceMappingURL=BooleanByteWrapper.js.map