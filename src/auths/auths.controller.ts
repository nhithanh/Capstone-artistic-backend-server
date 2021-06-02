import { Controller, Post, UseGuards, Request, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthsController {
  
  @Inject()
  authService: AuthsService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.genToken(req.user)
  }
}
