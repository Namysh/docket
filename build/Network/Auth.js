"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("../Utils/Logger");
const net = require("net");
const AuthServer_1 = require("../Network/AuthServer");
// Liste des serveurs connectés
exports.servers = [];
// Démarrer une connexion à un serveur
exports.start = (option, loginValidationAction) => {
    const client = net.createConnection(option, () => {
        Logger.debug('Connecté au serveur d\'identification');
        const server = new AuthServer_1.default(client, loginValidationAction);
        exports.servers.push(server);
        Logger.debug(exports.servers.length + ' serveurs connectés');
    });
    client.on('error', (error) => {
        Logger.error(error.message);
    });
};
// Retirer une connexion à un serveur
exports.removeServer = (server) => {
    const index = exports.servers.indexOf(server);
    if (index !== -1) {
        exports.servers.splice(index, 1);
        Logger.debug('server deconnected');
    }
};
//# sourceMappingURL=Auth.js.map