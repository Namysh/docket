"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NoSuchFileOrDirectoryError_1 = require("../../Errors/ConfigManagerErrors/readFileErrors/NoSuchFileOrDirectoryError");
const PermissionDeniedError_1 = require("../../Errors/ConfigManagerErrors/readFileErrors/PermissionDeniedError");
const CommonSystemErrorsEnum_1 = require("../../Enums/CommonSystemErrorsEnum");
/**
 * Traite les erreurs de la fonction 'readFile' qui provient de l'API proposée
 * par le module File System de Node.js
 * https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
 * @param code
 * @param file
 */
exports.handleError = (code, file) => {
    switch (code) {
        case CommonSystemErrorsEnum_1.CommonSystemErrorsEnum.NO_SUCH_FILE_OR_DIRECTORY:
            throw new NoSuchFileOrDirectoryError_1.default(file);
        case CommonSystemErrorsEnum_1.CommonSystemErrorsEnum.PERMISSION_DENIED:
            throw new PermissionDeniedError_1.default(file);
    }
};
//# sourceMappingURL=readFileErrorHandler.js.map