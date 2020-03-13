import NoSuchFileOrDirectoryError from "../../Errors/ConfigManagerErrors/readFileErrors/NoSuchFileOrDirectoryError";
import PermissionDeniedError from "../../Errors/ConfigManagerErrors/readFileErrors/PermissionDeniedError";
import {CommonSystemErrorsEnum} from "../../Enums/CommonSystemErrorsEnum";

/**
 * Traite les erreurs de la fonction 'readFile' qui provient de l'API proposée
 * par le module File System de Node.js
 * https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
 * @param code
 * @param file
 */
export const handleError: (code: string, file: string) => void =
    (code: string, file: string): void => {
        switch (code) {
            case CommonSystemErrorsEnum.NO_SUCH_FILE_OR_DIRECTORY:
                throw new NoSuchFileOrDirectoryError(file);
            case CommonSystemErrorsEnum.PERMISSION_DENIED:
                throw new PermissionDeniedError(file);
        }
    };