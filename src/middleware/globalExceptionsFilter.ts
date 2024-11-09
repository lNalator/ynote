import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TimeoutError } from 'rxjs';
import {
  ConnectionError,
  ConnectionRefusedError,
  ConnectionTimedOutError,
  DatabaseError,
  ForeignKeyConstraintError,
  SequelizeScopeError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Verifie si l'exception est une instance de HttpException
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = exception.message;

    switch (true) {
      case exception instanceof HttpException:
        status = exception.getStatus();
        errorMessage = exception.getResponse() as string;
        break;
      case exception instanceof UniqueConstraintError:
        status = HttpStatus.BAD_REQUEST;
        errorMessage =
          'Unique constraint violation. Please ensure unique values for specified fields.';
        break;
      case exception instanceof ForeignKeyConstraintError:
        status = HttpStatus.BAD_REQUEST;
        errorMessage =
          'Foreign key constraint violation. Please ensure referenced records exist.';
        break;
      case exception instanceof ValidationError:
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'Validation error. Some fields contain invalid data.';
        break;
      case exception instanceof DatabaseError:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = 'Database error. Please contact support.';
        break;
      case exception instanceof TimeoutError:
        status = HttpStatus.REQUEST_TIMEOUT;
        errorMessage = 'Database request timed out. Please try again later.';
        break;
      case exception instanceof ConnectionError:
        status = HttpStatus.SERVICE_UNAVAILABLE;
        errorMessage = 'Database connection error. Please contact support.';
        break;
      case exception instanceof ConnectionRefusedError:
        status = HttpStatus.SERVICE_UNAVAILABLE;
        errorMessage =
          'Database connection was refused. Please check your database server.';
        break;
      case exception instanceof ConnectionTimedOutError:
        status = HttpStatus.REQUEST_TIMEOUT;
        errorMessage = 'Database connection timed out. Please try again later.';
        break;
      case exception instanceof SequelizeScopeError:
        status = HttpStatus.BAD_REQUEST;
        errorMessage =
          'Sequelize scope error. Please check query scope configurations.';
        break;
    }

    console.error('Exception caught by GlobalExceptionsFilter:', exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
    });
  }
}
