/**
 * Erreur d'autorisation refusée lors de l'ouverture d'un fichier
 */
export default class PermissionDeniedError extends Error {
    public name;
    public message;

    public constructor(file: string) {
        super();
        this.name = 'Permission denied';
        this.message = `L'accès au fichier "${file}" n'est pas permis.`;
    }
}