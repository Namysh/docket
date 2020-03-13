"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigManager_1 = require("./Utils/ConfigManager");
const Logger = require("./Utils/Logger");
const Auth = require("./Network/Auth");
const LoginValidationAction_1 = require("./Model/LoginValidationAction");
console.log("ccc");
// On charge la configuration et ...
ConfigManager_1.default.load(() => {
    // Pour tous les comptes trouvés on lance un serveur d'identification
    for (const account of ConfigManager_1.default.configData.account) {
        Logger.info(`username : ${account.username} ; password : ${account.password}`);
        Auth.start(ConfigManager_1.default.configData.option, new LoginValidationAction_1.default(account.username, account.password, true, account.serverId));
    }
});
// TODO : essayer d'utiliser AWAIT au lieu de faire plein de callback
// TODO : créer un type callback empty
//# sourceMappingURL=App.js.map