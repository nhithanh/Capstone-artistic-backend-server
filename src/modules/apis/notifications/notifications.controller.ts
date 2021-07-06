import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { Req } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.notificationsService.findAll(req.user.id);
  }

  @Get('/all-read')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req) {
    return this.notificationsService.removeAll(req.user.id);
  }
}
