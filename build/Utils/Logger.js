"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerColorsEnum_1 = require("../Enums/LoggerColorsEnum");
const log = (color, header, message) => console.log(`${color} [${header}] : ${message}`);
exports.info = (message) => log(LoggerColorsEnum_1.LoggerColorsEnum.FG_GREEN, 'INFO', message);
exports.error = (message) => log(LoggerColorsEnum_1.LoggerColorsEnum.FG_RED, 'ERROR', message);
exports.debug = (message) => log(LoggerColorsEnum_1.LoggerColorsEnum.FG_MAGENTA, 'DEBUG', message);
exports.network = (message) => log(LoggerColorsEnum_1.LoggerColorsEnum.FB_CYAN, 'NETWORK', message);
//# sourceMappingURL=Logger.js.map