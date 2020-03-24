/**
 * Version du jeu
 */
export default class Version {
    public constructor(public major,
                public minor,
                public code,
                public build,
                public buildType) {
    }

    public deserialize(buffer) {
        this.major = buffer.readByte();
        this.minor = buffer.readByte();
        this.code = buffer.readByte();
        this.build = buffer.writeInt();
        this.buildType = buffer.readByte();
    }

    public serialize(buffer) {
        buffer.writeByte(this.major);
        buffer.writeByte(this.minor);
        buffer.writeByte(this.code);
        buffer.writeInt(this.build);
        buffer.writeByte(this.buildType);
    }
}

