class PermissionDeniedError extends Error{
    constructor(file) {
        super();
        this.message = 'L\'accès au fichier "' + file + '" n\'est pas permis.';
        this.name = 'Permission denied';
    }
}

module.exports = PermissionDeniedError;
