import * as Logger from '../Utils/Logger';
import * as net from 'net';
import AuthServer from '../Network/AuthServer';
import LoginValidationAction from "../Model/LoginValidationAction";
// Liste des serveurs connectés
export const servers = [];

// Démarrer une connexion à un serveur
export const start = (option, loginValidationAction) => {
    const client = net.createConnection(option, () => {
        Logger.debug('Connecté au serveur d\'identification');
        const server = new AuthServer(client, loginValidationAction);
        servers.push(server);
        Logger.debug(servers.length + ' serveurs connectés');
    });

    client.on('error', (error: Error) => {
        Logger.error(error.message);
    })
};

// Retirer une connexion à un serveur
export const removeServer = (server) => {
    const index = servers.indexOf(server);
    if (index !== -1) {
        servers.splice(index, 1);
        Logger.debug('server deconnected');

    }
};
