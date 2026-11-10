export interface AppConfig {
  nodeEnv: string;
  port: number;
  frontendOrigins: string[];
  supabase: {
    url: string;
    secretKey: string;
  };
  mail: {
    resendApiKey: string;
    notifyEmail: string;
    mailFrom: string;
  };
  swagger: {
    enabled: boolean;
  };
}

export default (): AppConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const origins = (process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter((origin) => origin.length > 0);

  const enableSwagger =
    process.env.ENABLE_SWAGGER !== undefined &&
    process.env.ENABLE_SWAGGER !== ''
      ? process.env.ENABLE_SWAGGER === 'true'
      : nodeEnv !== 'production';

  return {
    nodeEnv,
    port: parseInt(process.env.PORT || '3000', 10),
    frontendOrigins: origins,
    supabase: {
      url: process.env.SUPABASE_URL || '',
      secretKey: process.env.SUPABASE_SECRET_KEY || '',
    },
    mail: {
      resendApiKey: process.env.RESEND_API_KEY || '',
      notifyEmail: process.env.NOTIFY_EMAIL || '',
      mailFrom:
        process.env.MAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
    },
    swagger: {
      enabled: enableSwagger,
    },
  };
};
