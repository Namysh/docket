import * as AuthHandler from '../Handlers/Logic/AuthHandler';
import * as HandShakeHandler from '../Handlers/Logic/HandShakeHandler';
import * as Logger from '../Utils/Logger';
import * as Messages from '../IO/dofus/Messages';

export default class Processor {

    static PROTOCOL_HANDLERS = {
        1: {message: Messages.ProtocolRequiredMessage, handler: HandShakeHandler.handleProtocolRequiredMessage},
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
