import ByteBoxOverflowError from "../Errors/BooleanByteWrapperErrors/ByteBoxOverflowError";

export const setFlag: (byte: number, position: number, boolean: boolean) => number =
    (byte: number, position: number, boolean: boolean): number => {
        if (position > 7) throw new ByteBoxOverflowError(position);
        return (+boolean << position) | byte
    };

export const getFlag: (byte: number, position: number) => boolean =
    (byte: number, position: number): boolean => {
        if (position > 7) throw new ByteBoxOverflowError(position);
        return !!(byte >> position);
    };

