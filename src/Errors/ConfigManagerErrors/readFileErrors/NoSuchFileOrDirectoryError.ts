/**
 * Erreur fichier ou dossier existant lors de l'ouverture d'un fichier
 */
export default class NoSuchFileOrDirectoryError extends Error {
    public name;
    public message;

    public constructor(file: string) {
        super();
        this.name = 'No such file or directory';
        this.message = `Le fichier "${file}" est introuvable.`;
    }
}