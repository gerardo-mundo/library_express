import winston from 'winston';

export class WinstonLoggerAdapter implements ILoggerAdapter {
  private file: string;
  private logger: winston.Logger;

  constructor(file: string, service?: string, controller?: string) {
    this.file = file;

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { file: this.file, service, controller },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }

  public writeError(msg: string) {
    this.logger.error(`(file: ${this.file}) || message: ${msg}`);
  }

  public writeInfo(msg: string) {
    this.logger.info(`(file: ${this.file}) || message: ${msg}`);
  }

  public writeWarn(msg: string) {
    this.logger.warn(`(file: ${this.file}) || message: ${msg}`);
  }
}

interface ILoggerAdapter {
  writeInfo: (msg: string) => void;
  writeWarn: (msg: string) => void;
  writeError: (msg: string) => void;
}
