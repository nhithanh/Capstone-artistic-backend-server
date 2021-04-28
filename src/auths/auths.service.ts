import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
  }

  async login({ user }: any) {
    const payload = { username: user.username, sub: user.userId, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
