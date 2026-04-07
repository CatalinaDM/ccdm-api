import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private prisma: PrismaService) {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const user = (request as any).user;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';
    // FIXME: Almacenar la información en la base de datos
    try {
      await this.prisma.logs.create({
        data: {
          statusCode: status,
          timestamp: new Date(),
          path: request.url,
          error:
            typeof message === 'string'
              ? message
              : (message as any).message || JSON.stringify(message),
          errorCode:
            (exception as { errorCode?: string }).errorCode || 'UNKNOWN_ERROR',
          session_id: user?.id || null,
        },
      });
    } catch (err) {
      console.error('Error guardando log:', err);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error:
        typeof message === 'string'
          ? message
          : (message as any).message || message,
      errorCode:
        (exception as { errorCode?: string }).errorCode || 'UNKNOWN_ERROR',
    });
  }
}
