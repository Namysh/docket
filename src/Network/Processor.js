const Formatter = require('../Utils/Formatter');
const AuthHandler = require('../handlers/AuthHandler');
const Logger = require('../IO/Logger');
const IO = require('../Utils/IO/CustomDataWrapper');
const Messages = require('../IO/dofus/Messages');

class Processor {

    static PROTOCOL_HANDLERS = {
        1: {message: Messages.ProtocolRequiredMessage, handler: AuthHandler.handleProtocolRequiredMessage},
        3: {message: Messages.HelloConnectMessage, handler: AuthHandler.handleHelloConnectMessage},
        // changer (mettre le SystemDisplayMessage dans un autre handler
        189: {message: Messages.SystemMessageDisplayMessage, handler: AuthHandler.handleSystemMessageDisplayMessage}

    };

    static handle(client, messageId, buffer) {

        const handler = Processor.PROTOCOL_HANDLERS[parseInt(messageId)];

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
        } else {
            Logger.error("Handler not found for messageId: " + messageId);
            //client.send(new Messages.BasicNoOperationMessage());
        }
    }


}

module.exports = Processor;
