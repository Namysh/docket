const Logger = require('./Logger');
const fs = require('fs');
const readFileErrorHandler = require('../Handlers/ConfigManagerHandlers/readFileErrorHandler');
const JSONParseErrorHandler = require('../Handlers/ConfigManagerHandlers/JSONParseErrorHandler');
class ConfigManager {

    // Chemin du fichier de configuration JSON
    static configFile = "../config.json";

    // Données du fichier JSON
    static configData = null;

    // Fonction de lecture du fichier JSON
    static load = (callback) => {
        fs.readFile(ConfigManager.configFile, 'utf8', (readFileError, data) => {

            // ReadFile error handling
            if(readFileError) readFileErrorHandler.handleError(error.code, ConfigManager.configFile);

            // JSON parse error handling
            try{
                ConfigManager.configData = JSON.parse(data);
            }catch (JSONParseError) {
                JSONParseErrorHandler.handleError(JSONParseError);
            }

            Logger.info('Configuration file loaded successfully ! ' +
                Object.keys(ConfigManager.configData).length +
                ' datas loaded');

            callback();

        })

    };
}


module.exports =
    ConfigManager;
