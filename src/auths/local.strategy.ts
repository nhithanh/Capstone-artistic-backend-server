import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { UsersService } from 'src/modules/apis/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  @Inject()
  private readonly userService: UsersService;

  constructor(private authService: AuthsService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return this.userService.findByCredential(username, password);
  }
}
