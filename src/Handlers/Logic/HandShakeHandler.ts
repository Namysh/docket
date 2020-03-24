import * as Logger from '../Utils/Logger';

/**
 * Traite le message 'ProtocolRequiredMessage'
 * @param client
 * @param packet
 */
export const handleProtocolRequiredMessage = (client, packet) => {
    Logger.debug("Required = " + packet.requiredVersion + " - Current = " + packet.currentVersion + "\r");
};