"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Formatter = require("../Utils/Formatter");
const NetworkMessageHandler_1 = require("../Handlers/NetworkMessageHandler");
const ByteArray = require("bytearray-node");
const NetworkMessage_1 = require("../IO/dofus/NetworkMessage");
const ArrayBufferToBuffer = require("arraybuffer-to-buffer");
const CustomDataWrapper_1 = require("../IO/CustomDataWrapper");
const Logger = require("../Utils/Logger");
class AuthServer {
    constructor(socket, loginValidationAction) {
        this.socket = socket;
        this.loginValidationAction = loginValidationAction;
        this.socket = socket;
        this.receive();
        this.id = AuthServer.numberOfServers++;
        this.loginValidationAction = loginValidationAction;
    }
    receive() {
        // ou var _this = this
        this.socket.on('data', data => {
            const buffer = new CustomDataWrapper_1.CustomDataWrapper(Formatter.toArrayBuffer(data));
            while (buffer.bytesAvailable > 0) {
                this.processPart(buffer);
            }
        });
    }
    processPart(buffer) {
        const header = buffer.readShort();
        const packetId = header >> 2;
        const lenType = header & 3;
        const packetLen = NetworkMessage_1.default.getPacketLength(buffer, lenType);
        Logger.debug("Données reçues (messageId: " + packetId + ", len: " + packetLen + ", real len: " + buffer.data.length + ")");
        const b = ArrayBufferToBuffer(buffer.data.buffer);
        const messagePart = b.slice(buffer.position, buffer.position + packetLen) || null;
        NetworkMessageHandler_1.default.handle(this, packetId, new CustomDataWrapper_1.CustomDataWrapper(Formatter.toArrayBuffer(messagePart)));
        buffer.position = buffer.position + packetLen;
    }
    send(packet) {
        try {
            packet.serialize();
            const messageBuffer = new CustomDataWrapper_1.CustomDataWrapper(new ByteArray());
            let offset = packet.writePacket(messageBuffer, packet.messageId, packet.buffer._data);
            const b = ArrayBufferToBuffer(messageBuffer.data.buffer);
            if (offset === undefined) {
                offset = 2;
            }
            const finalBuffer = b.slice(0, packet.buffer._data.write_position + offset);
            this.socket.write(finalBuffer);
            Logger.network("Paquet envoyé : '" + packet.constructor.name + "' (id: " + packet.messageId + ", packetlen: " + packet.buffer._data.write_position + ", len: " + finalBuffer.length + " -- " + b.length + ")");
        }
        catch (ex) {
            Logger.error('Impossible d\'envoyer le paquet du client');
        }
    }
}
AuthServer.numberOfServers = 0;
exports.default = AuthServer;
//# sourceMappingURL=AuthServer.js.map