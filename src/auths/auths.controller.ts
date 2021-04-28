import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDTO })
  async login(@Request() req: LoginDTO): Promise<any> {
    return this.authsService.login((req as any).user);
  }
}
