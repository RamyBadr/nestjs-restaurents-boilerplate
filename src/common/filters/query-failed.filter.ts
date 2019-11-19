import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
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
        console.log(exception.message,"err message");
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const errorMessage = ConstraintErrors[exception.constraint];

        // const status =
        //     exception.constraint && exception.constraint.startsWith('UQ')
        //         ? HttpStatus.CONFLICT
        //         : HttpStatus.INTERNAL_SERVER_ERROR;
        const status = HttpStatus.CONFLICT;

        response.status(status).json({
            statusCode: status,
            error: STATUS_CODES[status],
            message: "errorMessage",
        });
    }
}
