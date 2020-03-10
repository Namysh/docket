const ByteArray = require('../IO/ByteArray');
const NetworkMessage = require('../IO/dofus/NetworkMessage');
const Formatter = require('../Utils/Formatter');
const ArrayBufferToBuffer = require('arraybuffer-to-buffer');
const CustomDataWrapper = require('../Utils/IO/CustomDataWrapper');
const Logger = require('../IO/Logger');
const Processor = require('./Processor');

class AuthServer{

    static numberOfServers = 0;

    constructor(socket, loginValidationAction){
        this.socket = socket;
        this.receive();
        this.id = AuthServer.numberOfServers++;
        this.loginValidationAction = loginValidationAction;
    }

    receive(){
        // ou var _this = this
        this.socket.on('data', data => {
            const buffer = new CustomDataWrapper(Formatter.toArrayBuffer(data));

            while(buffer.bytesAvailable > 0) {
                this.processPart(buffer);
            }
        })
    }

    processPart(buffer){

        const header = buffer.readShort();
        const packetId = header >> 2;
        const lenType = header & 3;
        const packetLen = NetworkMessage.getPacketLength(buffer, lenType);

        Logger.network("Données reçues (messageId: " + packetId + ", len: " + packetLen + ", real len: " + buffer.data.length + ")");

        const b = ArrayBufferToBuffer(buffer.data.buffer);

        const messagePart = b.slice(buffer.position, buffer.position + packetLen) || null;
        Processor.handle(this, packetId, new CustomDataWrapper(Formatter.toArrayBuffer(messagePart)));
        buffer.position = buffer.position + packetLen;
    }

    send(packet) {
        try {
            packet.serialize();
            const messageBuffer = new CustomDataWrapper(new ByteArray());
            let offset = NetworkMessage.writePacket(messageBuffer, packet.messageId, packet.buffer._data);
            const b = ArrayBufferToBuffer(messageBuffer.data.buffer);
            if(offset === undefined) {
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

module.exports = AuthServer;