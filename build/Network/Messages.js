"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { CustomDataWrapper } = require('../IO/CustomDataWrapper');
const Logger = require('../Utils/Logger');
const BooleanByteWrapper = require('../IO/BooleanByteWrapper');
const Version = require('../IO/Dofus/Types');
class ProtocolMessage {
    constructor(messageId) {
        this.messageId = messageId;
        this.buffer = new CustomDataWrapper();
    }
}
exports.ProtocolMessage = ProtocolMessage;
class ProtocolRequiredMessage extends ProtocolMessage {
    constructor() {
        super(1);
    }
    deserialize(buffer) {
        this.requiredVersion = buffer.readInt();
        this.currentVersion = buffer.readInt();
    }
}
exports.ProtocolRequiredMessage = ProtocolRequiredMessage;
class HelloConnectMessage extends ProtocolMessage {
    constructor() {
        super(3);
    }
    deserialize(buffer) {
        this.salt = buffer.readUTF();
        this.key = [];
        const keyLen = buffer.readVarInt();
        for (let i = 0; i < keyLen; i++) {
            this.key.push(buffer.readByte());
        }
    }
}
exports.HelloConnectMessage = HelloConnectMessage;
class IdentificationMessage extends ProtocolMessage {
    constructor(version, lang, credentials, serverId, autoconnect, useCertificate, useLoginToken, sessionOptionalSalt, failedAttempts) {
        super(4);
        this.version = version;
        this.lang = lang;
        this.credentials = credentials;
        this.serverId = serverId;
        this.autoconnect = autoconnect;
        this.useCertificate = useCertificate;
        this.useLoginToken = useLoginToken;
        this.sessionOptionalSalt = sessionOptionalSalt;
        this.failedAttempts = failedAttempts;
    }
    serialize() {
        let box = 0;
        box = BooleanByteWrapper.setFlag(box, 0, this.autoconnect);
        box = BooleanByteWrapper.setFlag(box, 1, this.useCertificate);
        box = BooleanByteWrapper.setFlag(box, 2, this.useLoginToken);
        this.buffer.writeByte(box);
        this.version.serialize(this.buffer);
        this.buffer.writeUTF(this.lang);
        this.buffer.writeVarInt(this.credentials.length);
        for (let i = 0; i < this.credentials.length; i++) {
            this.buffer.writeByte(this.credentials[i]);
        }
        this.buffer.writeShort(this.serverId);
        // TODO voir IdentificationMessage source de jeu
        this.buffer.writeVarLong(this.sessionOptionalSalt);
        this.buffer.writeShort(this.failedAttempts.length);
        for (let i = 0; i < this.failedAttempts.length; i++) {
            // TODO voir IdentificationMessage source de jeu
            this.buffer.writeVarShort(this.failedAttempts[i]);
        }
    }
}
exports.IdentificationMessage = IdentificationMessage;
class SystemMessageDisplayMessage extends ProtocolMessage {
    constructor(hangUp, msgId, parameters) {
        super(189);
        this.hangUp = hangUp;
        this.msgId = msgId;
        this.parameters = parameters;
    }
    deserialize(buffer) {
        this.hangUp = buffer.readBoolean();
        this.msgId = buffer.readVarUhShort();
        if (this.msgId < 0) {
            Logger.error("Forbidden value (" + this.msgId + ") on element of SystemMessageDisplayMessage.msgId.");
        }
        const parametersLen = buffer.readUnsignedShort();
        for (let i = 0; i < parametersLen; i++) {
            this.parameters.push(buffer.readUTF());
        }
    }
}
exports.SystemMessageDisplayMessage = SystemMessageDisplayMessage;
//# sourceMappingURL=Messages.js.map