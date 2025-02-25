import { Module } from '@nestjs/common';
import { MailService } from './service/mail.service';
import { PaginationService } from './service/pagination.service';

@Module({
  providers: [MailService, PaginationService],
  exports: [MailService, PaginationService],
})
export class SharedModule {}
