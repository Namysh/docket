const CommonSystemErrorsEnum = require('../../Enums/CommonSystemErrorsEnum');
const NoSuchFileOrDirectoryError = require('../../Errors/ConfigManagerErrors/readFileErrors/NoSuchFileOrDirectoryError');
const PermissionDeniedError = require('../../Errors/ConfigManagerErrors/readFileErrors/PermissionDeniedError');

const handleError = (code, file) => {
    switch (code) {
        case CommonSystemErrorsEnum.NO_SUCH_FILE_OR_DIRECTORY:
            throw new NoSuchFileOrDirectoryError(file);
        case CommonSystemErrorsEnum.PERMISSION_DENIED:
            throw new PermissionDeniedError(file);
    }
};

module.exports = {
    handleError
};