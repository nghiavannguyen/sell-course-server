import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './module/auth/guard/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { SendMailDto } from './lib/shared/dto/send-mail.dto';
import { MailService } from './lib/shared/service/mail.service';
import { Public } from './lib/shared/constant/meta-data';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('email')
  @Public()
  @ApiOperation({ description: 'Send email' })
  async sendMail(@Body() sendMailDto: SendMailDto) {
    return this.mailService.sendEmail(sendMailDto);
  }

  @Get('home')
  @Public()
  @ApiOperation({ description: 'get home information' })
  async getHomeInformation() {
    return 'home information';
  }
}
