import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AlbumsModule } from '../albums/albums.module';
import { MailModule } from 'src/mail/mail.module';
import { AuthsModule } from 'src/auths/auths.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AlbumsModule, MailModule, forwardRef(() => AuthsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
