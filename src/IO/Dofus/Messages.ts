const {CustomDataWrapper} = require('../CustomDataWrapper');
const Logger = require('../../Utils/Logger');
const BooleanByteWrapper = require('../BooleanByteWrapper');
const Version = require('../../IO/dofus/Types');

export class ProtocolMessage {
    public buffer;

    constructor(public messageId) {
        this.buffer = new CustomDataWrapper();
    }
}

export class ProtocolRequiredMessage extends ProtocolMessage {
    public requiredVersion;
    public currentVersion;

    constructor() {
        super(1);
    }

    deserialize(buffer) {
        this.requiredVersion = buffer.readInt();
        this.currentVersion = buffer.readInt();
    }
}

export class HelloConnectMessage extends ProtocolMessage {
    public salt: string;
    public key: number[];

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

export class IdentificationMessage extends ProtocolMessage {

    constructor(private version,
                private lang,
                private credentials,
                private serverId,
                private autoconnect,
                private useCertificate,
                private useLoginToken,
                private sessionOptionalSalt,
                private failedAttempts) {
        super(4);
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

        for(let i = 0; i < this.credentials.length; i++){
            this.buffer.writeByte(this.credentials[i]);
        }

        this.buffer.writeShort(this.serverId);

        // TODO voir IdentificationMessage source de jeu

        this.buffer.writeVarLong(this.sessionOptionalSalt);

        this.buffer.writeShort(this.failedAttempts.length);

        for(let i = 0; i < this.failedAttempts.length; i++){
            // TODO voir IdentificationMessage source de jeu
            this.buffer.writeVarShort(this.failedAttempts[i]);
        }


    }
}

export class SystemMessageDisplayMessage extends ProtocolMessage {

    constructor(public hangUp,
                public msgId,
                public parameters) {
        super(189);
    }

    deserialize(buffer) {
        this.hangUp = buffer.readBoolean();
        this.msgId = buffer.readVarUhShort();
        if (this.msgId < 0) {
            Logger.error("Forbidden value (" + this.msgId + ") on element of SystemMessageDisplayMessage.msgId.");
        }

        const parametersLen = buffer.readUnsignedShort();

        for(let i = 0; i < parametersLen; i++){
            this.parameters.push(buffer.readUTF());
        }
    }
}

