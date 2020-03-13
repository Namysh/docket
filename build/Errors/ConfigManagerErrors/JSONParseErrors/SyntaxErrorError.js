"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Erreur de syntaxe lors de l'analyse d'un fichier JSON
 */
class SyntaxErrorError extends Error {
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
    }
}
exports.default = SyntaxErrorError;
//# sourceMappingURL=SyntaxErrorError.js.map