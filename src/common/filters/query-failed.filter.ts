import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { STATUS_CODES } from 'http';
// import { QueryFailedError } from 'typeorm';
import { ConstraintErrors } from './constraint-errors';
import { MongoException } from '../exceptions/mongodb.exception';

@Catch(MongoException)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: any, host: ArgumentsHost) {
    console.log(exception, 'err');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // const errorMessage = ConstraintErrors[exception.constraint];

    const status = ResolveMongoError.resolveErrorStatus(exception.error);

    // const status = HttpStatus.CONFLICT;

    response.status(status).json({
      status: status,
      error: STATUS_CODES[status],
      message: exception.error.errmsg
    });
  }
}
const MongoErrorCodes = {
  '11000': HttpStatus.CONFLICT
};
export class ResolveMongoError {
  public static resolveErrorStatus(error: any): number {
    if (error.code && MongoErrorCodes[error.code.toString()]) {
      return MongoErrorCodes[error.code.toString()];
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
