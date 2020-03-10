class NetworkMessage {

    static BIT_RIGHT_SHIFT_LEN_PACKET_ID = 2;
    static BIT_MASK = 3;

    static writePacket(param1, param2, param3) {
        var _loc5_ = 0;
        var _loc6_ = 0;
        var _loc4_ = this.computeTypeLen(param3.write_position);
        param1.writeShort(this.subComputeStaticHeader(param2, _loc4_));
        switch (_loc4_) {
            case 0:
                return;
            case 1:
                param1.writeByte(param3.write_position);
                break;
            case 2:
                param1.writeShort(param3.write_position);
                break;
            case 3:
                _loc5_ = param3.write_position >> 16 & 255;
                _loc6_ = param3.write_position & 65535;
                param1.writeByte(_loc5_);
                param1.writeShort(_loc6_);
                break;
        }
        var offset = param1._data.write_position;
        param1.writeBytes(param3);
        return offset;
    }

    static computeTypeLen(param1) {
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

    static subComputeStaticHeader(msgId, typeLen) {
        return msgId << NetworkMessage.BIT_RIGHT_SHIFT_LEN_PACKET_ID | typeLen;
    }

    static getPacketLength(buffer, len) {
        let packetLen = 0;
        while (len--)
            packetLen = (packetLen << 0b1000) + buffer.readByte();
        return packetLen;
    }
}

module.exports = NetworkMessage;