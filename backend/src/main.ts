import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Trust proxy for Render / reverse proxies so rate limiting sees real client IP
  app.set('trust proxy', 1);

  // Disable x-powered-by
  app.disable('x-powered-by');

  // Security headers
  app.use(helmet());

  // Body parsers with 20kb size limits
  app.use(json({ limit: '20kb' }));
  app.use(urlencoded({ extended: true, limit: '20kb' }));

  // Read configuration
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('nodeEnv') || 'development';
  const port = configService.get<number>('port') || 3000;
  const frontendOrigins = configService.get<string[]>('frontendOrigins') || [];
  const enableSwagger = configService.get<boolean>('swagger.enabled') ?? false;

  // CORS configuration
  app.enableCors({
    origin: (origin, callback) => {
      // In production, requests without an Origin header are not given CORS access
      if (!origin) {
        if (nodeEnv === 'production') {
          callback(null, false);
        } else {
          callback(null, true);
        }
        return;
      }

      if (frontendOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger API Documentation
  if (enableSwagger) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Portfolio API')
      .setDescription('Production-ready backend API for portfolio')
      .setVersion('1.0')
      .addTag('contact', 'Contact form message submission')
      .addTag('health', 'Health check and keep-alive endpoints')
      .addTag('assistant', 'AI assistant chat endpoint')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);
    logger.log('Swagger documentation enabled at /api/docs');
  }

  // Graceful shutdown
  app.enableShutdownHooks();

  // Listen on 0.0.0.0 and PORT
  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on http://0.0.0.0:${port}/api`);
}

void bootstrap();
