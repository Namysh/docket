import * as Logger from '../../Utils/Logger';
import * as net from 'net';
import AuthentificationServer from '../Server/AuthentificationServer';

// Liste des serveurs connectés
export const servers = [];

// Démarrer une connexion à un serveur
export const start = (option, loginValidationAction) => {
    const client = net.createConnection(option, () => {
        Logger.info('Connecté au serveur d\'authentification');
        const server = new AuthentificationServer(client, loginValidationAction);
        servers.push(server);
        Logger.info(servers.length + ' serveur(s) connecté(s)');
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
