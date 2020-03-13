"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Erreur d'autorisation refusée lors de l'ouverture d'un fichier
 */
class PermissionDeniedError extends Error {
    constructor(file) {
        super();
        this.name = 'Permission denied';
        this.message = `L'accès au fichier "${file}" n'est pas permis.`;
    }
}
exports.default = PermissionDeniedError;
//# sourceMappingURL=PermissionDeniedError.js.map