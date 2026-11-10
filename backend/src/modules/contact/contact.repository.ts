import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface CreateContactRecord {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactRecord {
  id: string;
}

@Injectable()
export class ContactRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(data: CreateContactRecord): Promise<ContactRecord> {
    const { data: record, error } = await this.supabaseService
      .getClient()
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject ?? null,
        message: data.message,
        email_status: 'pending',
      })
      .select('id')
      .single();

    if (error || !record) {
      throw new Error(
        `Database error creating contact message: ${error?.message ?? 'no record returned'}`,
      );
    }

    return record as ContactRecord;
  }

  async updateEmailStatus(
    id: string,
    status: 'sent' | 'failed',
  ): Promise<void> {
    const { error } = await this.supabaseService
      .getClient()
      .from('contact_messages')
      .update({ email_status: status })
      .eq('id', id);

    if (error) {
      throw new Error(`Database error updating email status: ${error.message}`);
    }
  }

  async ping(): Promise<boolean> {
    const { error } = await this.supabaseService
      .getClient()
      .from('contact_messages')
      .select('id')
      .limit(1);

    if (error) {
      throw new Error(`Database ping error: ${error.message}`);
    }

    return true;
  }
}
