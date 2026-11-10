import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

@Module({
  imports: [MailModule],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
  exports: [ContactService, ContactRepository],
})
export class ContactModule {}
