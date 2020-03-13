"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NetworkMessageEnum_1 = require("../../Enums/NetworkMessageEnum");
class NetworkMessage {
    constructor() {
        this.instanceId = ++NetworkMessage.GLOBAL_INSTANCE;
    }
    writePacket(output, messageId, data) {
        let high = 0;
        let low = 0;
        let typeLen = this.computeTypeLen(data.length);
        output.writeShort(this.subComputeStaticHeader(messageId, typeLen));
        output.writeUnsignedInt(this.instanceId);
        switch (typeLen) {
            case 0:
                return;
            case 1:
                output.writeByte(data.length);
                break;
            case 2:
                output.writeShort(data.length);
                break;
            case 3:
                high = data.length >> 16 & 255;
                low = data.length & 65535;
                output.writeByte(high);
                output.writeShort(low);
        }
        output.writeBytes(data, 0, data.length);
    }
    computeTypeLen(param1) {
        if (param1 > 65535) {
            return 3;
        }
        if (param1 > 255) {
            return 2;
        }
        if (param1 > 0) {
            return 1;
        }
        return 0;
    }
    subComputeStaticHeader(msgId, typeLen) {
        return msgId << NetworkMessageEnum_1.NetworkMessageEnum.BIT_RIGHT_SHIFT_LEN_PACKET_ID | typeLen;
    }
    static getPacketLength(buffer, len) {
        let packetLen = 0;
        while (len--)
            packetLen = (packetLen << 0b1000) + buffer.readByte();
        return packetLen;
    }
}
NetworkMessage.GLOBAL_INSTANCE = 0;
exports.default = NetworkMessage;
//# sourceMappingURL=NetworkMessage.js.map