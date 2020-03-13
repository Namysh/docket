"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Erreur fichier ou dossier existant lors de l'ouverture d'un fichier
 */
class NoSuchFileOrDirectoryError extends Error {
    constructor(file) {
        super();
        this.name = 'No such file or directory';
        this.message = `Le fichier "${file}" est introuvable.`;
    }
}
exports.default = NoSuchFileOrDirectoryError;
//# sourceMappingURL=NoSuchFileOrDirectoryError.js.map