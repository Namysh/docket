"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxErrorError_1 = require("../../Errors/ConfigManagerErrors/JSONParseErrors/SyntaxErrorError");
/**
 * Traite les erreurs de la fonction 'parse' qui provient de l'objet
 * natif JavaScript : JSON
 * @param JSONParseError
 */
exports.handleError = (JSONParseError) => {
    if (JSONParseError instanceof SyntaxError)
        throw new SyntaxErrorError_1.default(JSONParseError.name, JSONParseError.message);
};
//# sourceMappingURL=JSONParseErrorHandler.js.map