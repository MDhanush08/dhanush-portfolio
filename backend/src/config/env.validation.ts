import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return Environment.Development;
    }
    return value;
  })
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return 3000;
    const parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  })
  PORT: number = 3000;

  @IsString()
  @IsNotEmpty()
  FRONTEND_ORIGIN: string;

  @IsString()
  @IsNotEmpty()
  SUPABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  SUPABASE_SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  RESEND_API_KEY: string;

  @IsEmail()
  @IsNotEmpty()
  NOTIFY_EMAIL: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'Portfolio Contact <onboarding@resend.dev>';
    }
    return value;
  })
  MAIL_FROM: string = 'Portfolio Contact <onboarding@resend.dev>';

  @IsBoolean()
  @IsOptional()
  @Transform(
    ({ value, obj }: { value: unknown; obj: Record<string, unknown> }) => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return obj.NODE_ENV !== Environment.Production;
    },
  )
  ENABLE_SWAGGER: boolean;
}

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const REQUIRED_VARS = [
    'SUPABASE_URL',
    'SUPABASE_SECRET_KEY',
    'RESEND_API_KEY',
    'NOTIFY_EMAIL',
    'FRONTEND_ORIGIN',
  ];

  const missing = REQUIRED_VARS.filter((key) => {
    const val = config[key];
    return (
      val === undefined ||
      val === null ||
      (typeof val === 'string' && val.trim() === '')
    );
  });

  if (missing.length > 0) {
    throw new Error(
      `Environment validation failed. Missing or empty required environment variables: ${missing.join(', ')}`,
    );
  }

  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const invalidProps = errors.map((err) => err.property).join(', ');
    throw new Error(
      `Environment validation failed for variables: ${invalidProps}`,
    );
  }

  return validatedConfig;
}
