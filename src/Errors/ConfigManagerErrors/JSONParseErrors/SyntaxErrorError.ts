/**
 * Erreur de syntaxe lors de l'analyse d'un fichier JSON
 */
export default class SyntaxErrorError extends Error {
    public constructor(public name: string,
                       public message: string) {
        super();
    }
}