"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthHandler = require("./Logic/AuthHandler");
const HandShakeHandler = require("./Logic/HandShakeHandler");
const Logger = require("../Utils/Logger");
const Messages = require("../Network/Messages");
class NetworkMessageHandler {
    static handle(client, messageId, buffer) {
        const handler = NetworkMessageHandler.PROTOCOL_HANDLERS[parseInt(messageId)];
        if (handler != null) {
            const packet = new handler.message();
            Logger.network("Traitement du message '" + packet.constructor.name + "'");
            //try {
            packet.deserialize(buffer);
            handler.handler(client, packet);
            /*}
            catch(ex) {
                Logger.error("Error when process message ..");
                Logger.error(ex);
            }*/
        }
        else {
            Logger.error("Handler not found for messageId: " + messageId);
            //client.send(new Messages.BasicNoOperationMessage());
        }
    }
}
NetworkMessageHandler.PROTOCOL_HANDLERS = {
    1: { message: Messages.ProtocolRequiredMessage, handler: HandShakeHandler.handleProtocolRequiredMessage },
    3: { message: Messages.HelloConnectMessage, handler: AuthHandler.handleHelloConnectMessage },
    // changer (mettre le SystemDisplayMessage dans un autre handler
    189: { message: Messages.SystemMessageDisplayMessage, handler: AuthHandler.handleSystemMessageDisplayMessage }
};
exports.default = NetworkMessageHandler;
//# sourceMappingURL=NetworkMessageHandler.js.map