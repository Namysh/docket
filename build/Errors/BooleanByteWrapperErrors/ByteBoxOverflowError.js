"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Erreur de dépassement de bit(s) dans un octet
 */
class ByteBoxOverflowError extends Error {
    constructor(position) {
        super();
        this.name = 'ByteBox overflow';
        this.message = `La position "${position.toString()}" n'est pas valide, elle doit être comprise entre 0 et 7.`;
    }
}
exports.default = ByteBoxOverflowError;
//# sourceMappingURL=ByteBoxOverflowError.js.map