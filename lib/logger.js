const pino = require('pino');

const isProd = process.env.NODE_ENV === 'production';

// In production, we output raw JSON (GCP compatible).
// In development, we use pino-pretty for human-readable logs.
const loggerOptions = isProd ? {
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
        level: (label) => {
            // Mapping Pino levels to GCP severity levels
            const severityMap = {
                trace: 'DEBUG',
                debug: 'DEBUG',
                info: 'INFO',
                warn: 'WARNING',
                error: 'ERROR',
                fatal: 'CRITICAL',
            };
            return { severity: severityMap[label] || 'INFO' };
        },
    },
    messageKey: 'message',
} : {
    level: process.env.LOG_LEVEL || 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
        },
    },
};

const internalLogger = pino(loggerOptions);

// Wrapping pino to provide a drop-in replacement for the previous console-like wrapper
function extractMeta(args) {
    const parts = [];
    const meta = {};
    for (const arg of args) {
        if (arg instanceof Error) {
            meta.error = arg.message;
            meta.stack = arg.stack;
        } else if (typeof arg === 'object' && arg !== null) {
            Object.assign(meta, arg);
        } else {
            parts.push(String(arg));
        }
    }
    return { message: parts.join(' '), meta };
}

const log = {
    info: (...args) => {
        const { message, meta } = extractMeta(args);
        internalLogger.info(meta, message);
    },
    warn: (...args) => {
        const { message, meta } = extractMeta(args);
        internalLogger.warn(meta, message);
    },
    error: (...args) => {
        const { message, meta } = extractMeta(args);
        internalLogger.error(meta, message);
    },
    debug: (...args) => {
        const { message, meta } = extractMeta(args);
        internalLogger.debug(meta, message);
    },
};

module.exports = log;
