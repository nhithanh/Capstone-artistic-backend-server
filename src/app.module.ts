import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './modules/users/users.module';
import { ContentsModule } from './modules/contents/contents.module';

@Module({
  imports: [AuthsModule, UsersModule, ContentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
