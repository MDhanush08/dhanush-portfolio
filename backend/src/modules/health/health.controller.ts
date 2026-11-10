import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { seconds, Throttle } from '@nestjs/throttler';
import { ContactRepository } from '../contact/contact.repository';

export interface HealthCheckResponse {
  status: 'ok';
  uptime: number;
  timestamp: string;
}

export interface DbHealthCheckResponse {
  status: 'ok';
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly contactRepository: ContactRepository) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Basic service health check' })
  @ApiResponse({
    status: 200,
    description: 'Service is operational',
    schema: {
      example: {
        status: 'ok',
        uptime: 123.45,
        timestamp: '2026-11-10T14:00:00.000Z',
      },
    },
  })
  check(): HealthCheckResponse {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('db')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: seconds(60) } })
  @ApiOperation({
    summary: 'Database health check and keep-alive ping for Supabase',
  })
  @ApiResponse({
    status: 200,
    description: 'Database is accessible',
    schema: {
      example: { status: 'ok' },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Database connection failed',
  })
  async checkDb(): Promise<DbHealthCheckResponse> {
    try {
      await this.contactRepository.ping();
      return { status: 'ok' };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unknown database error';
      this.logger.error(`Database health ping failed: ${errorMsg}`);
      throw new ServiceUnavailableException('Database unavailable');
    }
  }
}
