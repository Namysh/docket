const FG_RED = '\x1b[31m';
const FG_GREEN = '\x1b[32m';
const FG_MAGENTA = '\x1b[35m';
const FB_CYAN = '\x1b[36m';

const log = (color, header, message) => console.log(`${color} [${header}] : ${message}`);
const info = message => log(FG_GREEN, 'INFO', message);
const error = message => log(FG_RED, 'ERROR', message);
const debug = message => log(FG_MAGENTA, 'DEBUG', message);
const network = message => log(FB_CYAN, 'NETWORK', message);

module.exports = {
    info,
    error,
    debug,
    network
};