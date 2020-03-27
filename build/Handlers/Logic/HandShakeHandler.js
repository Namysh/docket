"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("../../Utils/Logger");
/**
 * Traite le message 'ProtocolRequiredMessage'
 * @param client
 * @param packet
 */
exports.handleProtocolRequiredMessage = (client, packet) => {
    Logger.debug("Required = " + packet.requiredVersion + " - Current = " + packet.currentVersion + "\r");
};
//# sourceMappingURL=HandShakeHandler.js.map