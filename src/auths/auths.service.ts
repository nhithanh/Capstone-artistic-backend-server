import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/apis/users/entities/user.entity';
import { UsersService } from 'src/modules/apis/users/users.service';

@Injectable()
export class AuthsService {

  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService;

  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.findByCredential(email, password)
  }

  async genToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      defaultAlbumId: user.defaultAlbumId
    }
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
