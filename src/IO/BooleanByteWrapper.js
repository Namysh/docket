const ByteBoxOverflowError = require('../Errors/BooleanByteWrapperErrors/ByteBoxOverflowError');

const setFlag = (byte, position, boolean) => {
    if (position > 7) throw new ByteBoxOverflowError(position);
    return (+boolean << position) | byte
};

const getFlag = (byte, position) => {
    if (position > 7) throw new ByteBoxOverflowError(position);
    return !!(byte >> position);
};

module.exports = {
    setFlag,
    getFlag
};

