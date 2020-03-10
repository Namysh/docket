const Logger = require('../IO/Logger');
const net = require('net');
const AuthServer = require('../Network/AuthServer');
const LoginValidationAction = require('../Model/LoginValidationAction');
// Liste des serveurs connectés
const servers = [];

// Démarrer une connexion à un serveur
const start = (option, loginValidationAction) => {
    const client = net.createConnection(option, () => {
        Logger.debug('Connecté au serveur d\'identification');
        const server = new AuthServer(client, loginValidationAction);
        servers.push(server);
        Logger.debug(servers.length + ' serveurs connectés');
    });
};

// Retirer une connexion à un serveur
const removeServer = (server) => {
    const index = servers.indexOf(server);
    if (index !== -1) {
        servers.splice(index, 1);
        Logger.debug('server deconnected');

    }
};

module.exports = {
    servers: servers,
    start,
    removeServer
};


