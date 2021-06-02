import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/modules/apis/users/users.module';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, LocalStrategy]
})
export class AuthsModule {}
