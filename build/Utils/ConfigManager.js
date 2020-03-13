"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const readFileErrorHandler = require("../Handlers/ConfigManagerHandlers/readFileErrorHandler");
const JSONParseErrorHandler = require("../Handlers/ConfigManagerHandlers/JSONParseErrorHandler");
const Logger = require("../Utils/Logger");
/**
 * Gestionnaire de configuration
 */
class ConfigManager {
}
/**
 * Chemin du fichier de configuration
 */
ConfigManager.configFile = "../config.json";
/**
 * Données récupérées dans le fichier de configuraiton
 */
ConfigManager.configData = null;
/**
 * Charge le fichier de configuration et exécute le callback
 * @param callback
 */
ConfigManager.load = (callback) => {
    // Lecture du fichier de configuration
    fs.readFile(ConfigManager.configFile, 'utf8', (readFileError, data) => {
        // Gestion des erreurs de fs.readFile
        if (readFileError)
            readFileErrorHandler.handleError(readFileError.code, ConfigManager.configFile);
        // Gestion des erreurs de JSON.parse
        try {
            ConfigManager.configData = JSON.parse(data);
        }
        catch (JSONParseError) {
            JSONParseErrorHandler.handleError(JSONParseError);
        }
        Logger.info('Configuration file loaded successfully ! ' +
            Object.keys(ConfigManager.configData).length +
            ' datas loaded');
        callback();
    });
};
exports.default = ConfigManager;
//# sourceMappingURL=ConfigManager.js.map