import ConfigManager from './Utils/ConfigManager';
import * as Logger from './Utils/Logger';
import * as Auth from './Network/Auth';
import LoginValidationAction from "./Model/LoginValidationAction";

console.log("ccc");
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


// TODO : créer un type callback empty