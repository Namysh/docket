"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Version du jeu
 */
class Version {
    constructor(major, minor, code, build, buildType) {
        this.major = major;
        this.minor = minor;
        this.code = code;
        this.build = build;
        this.buildType = buildType;
    }
    deserialize(buffer) {
        this.major = buffer.readByte();
        this.minor = buffer.readByte();
        this.code = buffer.readByte();
        this.build = buffer.writeInt();
        this.buildType = buffer.readByte();
    }
    serialize(buffer) {
        buffer.writeByte(this.major);
        buffer.writeByte(this.minor);
        buffer.writeByte(this.code);
        buffer.writeInt(this.build);
        buffer.writeByte(this.buildType);
    }
}
exports.default = Version;
//# sourceMappingURL=Types.js.map