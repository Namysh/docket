import * as fs from "fs";
import * as readFileErrorHandler from '../Handlers/ConfigManagerHandlers/readFileErrorHandler';
import * as JSONParseErrorHandler from '../Handlers/ConfigManagerHandlers/JSONParseErrorHandler';
import * as Logger from '../Utils/Logger';

/**
 * Gestionnaire de configuration
 */
export default class ConfigManager {
    /**
     * Chemin du fichier de configuration
     */
    static configFile = "../config.json";

    /**
     * Données récupérées dans le fichier de configuraiton
     */
    static configData = null;

    /**
     * Charge le fichier de configuration et exécute le callback
     * @param callback
     */
    static load: (callback: () => void) => void =
        (callback: () => void): void => {
            // Lecture du fichier de configuration
            fs.readFile(ConfigManager.configFile, 'utf8', (readFileError: any, data: string) => {
                // Gestion des erreurs de fs.readFile
                if (readFileError) readFileErrorHandler.handleError(readFileError.code, ConfigManager.configFile);
                // Gestion des erreurs de JSON.parse
                try {
                    ConfigManager.configData = JSON.parse(data);
                } catch (JSONParseError) {
                    JSONParseErrorHandler.handleError(JSONParseError);
                }

                Logger.info('Fichier de configuration chargé avec succès ! ' +
                    Object.keys(ConfigManager.configData).length +
                    ' données chargées');

                callback();

            })

        };
}