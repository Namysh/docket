const Logger = require('./IO/Logger');
const ConfigManager = require('./utils/ConfigManager');
const Auth = require('./Network/Auth');
const LoginValidationAction = require('./Model/LoginValidationAction');

// On charge la configuration et ...
ConfigManager.load(() => {
    // Pour tous les comptes trouvés on lance un serveur d'identification
    for(const account of ConfigManager.configData.account){
        Logger.info(`username : ${account.username} ; password : ${account.password}`);
        Auth.start(ConfigManager.configData.option, new LoginValidationAction(
            account.username,
            account.password,
            true,
            account.serverId
        ));
    }
});

// TODO : essayer d'utiliser AWAIT au lieu de faire plein de callback

