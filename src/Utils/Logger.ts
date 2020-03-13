import {LoggerColorsEnum} from '../Enums/LoggerColorsEnum';

const log: (color: LoggerColorsEnum, header: string, message: string) => void =
    (color: LoggerColorsEnum, header: string, message: string): void =>
        console.log(`${color} [${header}] : ${message}`);

export const info: (message: string) => void =
    (message: string): void =>
        log(LoggerColorsEnum.FG_GREEN, 'INFO', message);

export const error: (message: string) => void =
    (message: string): void =>
        log(LoggerColorsEnum.FG_RED, 'ERROR', message);

export const debug: (message: string) => void =
    (message: string) : void=>
        log(LoggerColorsEnum.FG_MAGENTA, 'DEBUG', message);

export const network: (message: string) => void =
    (message: string): void =>
        log(LoggerColorsEnum.FB_CYAN, 'NETWORK', message);
