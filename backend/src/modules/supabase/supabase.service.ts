import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private readonly configService: ConfigService) {
    const rawUrl = this.configService.get<string>('supabase.url') || '';
    const url =
      rawUrl
        .trim()
        .replace(/\/rest\/v1\/?$/, '')
        .replace(/\/+$/, '') || 'https://placeholder.supabase.co';
    const key =
      this.configService.get<string>('supabase.secretKey') || 'placeholder_key';

    this.client = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
