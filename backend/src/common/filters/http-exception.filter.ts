import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
        error = exception.name;
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, unknown>;

        if (Array.isArray(resObj.message)) {
          message = resObj.message as string[];
        } else if (typeof resObj.message === 'string') {
          message = resObj.message;
        } else {
          message = exception.message;
        }

        if (typeof resObj.error === 'string') {
          error = resObj.error;
        } else {
          error = exception.name;
        }
      }
    } else {
      const err =
        exception instanceof Error ? exception : new Error(String(exception));
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}: ${err.message}`,
        err.stack,
      );
    }

    if (statusCode >= 500 && exception instanceof HttpException) {
      this.logger.error(
        `HTTP ${statusCode} on ${request.method} ${request.url}: ${exception.message}`,
        exception.stack,
      );
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message,
    });
  }
}
