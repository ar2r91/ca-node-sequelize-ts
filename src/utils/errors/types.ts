import HttpStatus from 'http-status-codes';

/**
 * Top Category Errors
 */

// tslint:disable-next-line: max-classes-per-file
export class GeneralError extends Error {
  status: string;
  statusCode: number;
  code: string;
  timestamp: number;
  date?: string;
  data?: any;
  public path?: string;

  constructor(...args: any) {
    super(...args);

    if (args[0] instanceof Error) {
      this.stack = args[0].stack;
    }

    this.status = 'Fail';
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.code = 'EG000';
    this.name = this.constructor.name;

    process.env.TZ = 'America/Lima';
    this.timestamp = Date.now();
    this.date = new Date(this.timestamp).toString();

    this.data = null;
  }

  toJSON() {
    return {
      'status': this.status,
      'code': this.code,
      'type': this.name,
      'message': this.message || 'Something went wrong!',
      // 'timestamp': this.timestamp,
      // 'date': this.date,
      // 'path': this.path,
      'data': this.data,
      'stack': (process.argv[1].endsWith('.ts') && this.stack != null) ? this.stack.split("\n") : undefined,
    };
  }

}

// tslint:disable-next-line: max-classes-per-file
export class FunctionalError extends GeneralError {  // Business
  constructor(...args: any) {
    super(...args);
    this.code = 'EF000';
    this.name = this.constructor.name;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class TechnicalError extends GeneralError { // System
  constructor(...args: any) {
    super(...args);
    this.code = 'ET000';
    this.name = this.constructor.name;
  }
}

/**
 * Functional Category Errors
 */

// tslint:disable-next-line: max-classes-per-file
export class IncompleteRequestError extends FunctionalError {
  constructor(...args: any) {
    super(...args);
    this.code = 'EF001';
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.name = this.constructor.name + '[' + super.constructor.name + ']';
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ValidateRequestError extends FunctionalError {
  constructor(...args: any) {
    super(...args);
    this.code = 'EF002';
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.name = this.constructor.name + '[' + super.constructor.name + ']';
  }
}

// tslint:disable-next-line: max-classes-per-file
export class DataNotFoundException extends FunctionalError {
  constructor(...args: any) {
    super(...args);
    this.code = 'EF003';
    this.statusCode = HttpStatus.NOT_FOUND;
    this.name = this.constructor.name + '[' + super.constructor.name + ']';
    this.stack = this.stack;
  }
}

/**
 * Technical Category Errors
 */

// tslint:disable-next-line: max-classes-per-file
export class DatabaseConnectionError extends TechnicalError {
  constructor(...args: any) {
    super(...args);
    this.code = 'ET001';
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.name = this.constructor.name + '[' + super.constructor.name + ']';
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ResourceUnavailableError extends TechnicalError {
  constructor(...args: any) {
    super(...args);
    this.code = 'ET002';
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.name = this.constructor.name + '[' + super.constructor.name + ']';
  }
}
