import { format, createLogger, transports, Logger } from 'winston';
import moment from 'moment';

const containerName = 'travel_frontend';
const colorizer = format.colorize({ colors: { info: "black", warn: 'magenta'}, all: true});

export const logger = (): Logger => {
  const formatter = format.printf((info : any): string => {
    const {level, message, timestamp} = info;
    const messageString = `[${level.toUpperCase()}] ${moment(timestamp).format('YYYY-MM-DD HH:mm:ss')} [${containerName}] ${message.replace(/[\r\n]/g, '')}`
    return colorizer.colorize(level, messageString)
  });

  return createLogger({
    level: 'debug',
    format:format.combine(
      format.timestamp(),
      format.json(),
      formatter
    ),
    defaultMeta: { service: "winston-lambda" },
    transports: [new transports.Console()],
  });
};
