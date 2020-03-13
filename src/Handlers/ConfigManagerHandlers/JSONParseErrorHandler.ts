import SyntaxErrorError from "../../Errors/ConfigManagerErrors/JSONParseErrors/SyntaxErrorError";

/**
 * Traite les erreurs de la fonction 'parse' qui provient de l'objet
 * natif JavaScript : JSON
 * @param JSONParseError
 */
export const handleError: (JSONParseError: SyntaxError) => void =
    (JSONParseError: SyntaxError): void => {
        if (JSONParseError instanceof SyntaxError)
            throw new SyntaxErrorError(JSONParseError.name, JSONParseError.message);
    };