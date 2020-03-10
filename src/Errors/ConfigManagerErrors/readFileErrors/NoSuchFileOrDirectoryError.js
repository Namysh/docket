class NoSuchFileOrDirectoryError extends Error{
    constructor(file) {
        super();
        this.message = 'Le fichier "' + file + '" est introuvable.';
        this.name = 'No such file or directory';
    }
}

module.exports = NoSuchFileOrDirectoryError;
