import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/apis/users/entities/user.entity';
import { UsersService } from 'src/modules/apis/users/users.service';

@Injectable()
export class AuthsService {

  @Inject()
  private readonly usersService: UsersService;

  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return this.usersService.findByCredential(username, password)
  }

  async genToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      defaultAlbumId: user.defaultAlbumId
    }
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
