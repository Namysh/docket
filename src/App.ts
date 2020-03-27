import Configurator from './Utils/ConfigManager';
import * as Logger from './Utils/Logger';
import * as Auth from './Network/Auth';
import LoginValidationAction from "./Model/LoginValidationAction";

// On charge la configuration et ...
Configurator.load(() => {
    // Pour tous les comptes trouvés on lance un serveur d'identification
    for(const account of Configurator.configData.account){
        Logger.debug(`NDC : ${account.username} ; MDP : ${account.password}`);
        Auth.start(Configurator.configData.option, new LoginValidationAction(
            account.username,
            account.password,
            true,
            account.serverId
        ));
    }
});

// TODO : essayer d'utiliser AWAIT au lieu de faire plein de callback


// TODO : créer un type callback empty