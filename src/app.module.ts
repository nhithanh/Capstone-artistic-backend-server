import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StylesModule } from './modules/styles/styles.module';
import { AiModelsModule } from './modules/ai-models/ai-models.module';
import { AiModelSnapshotsModule } from './modules/ai-model-snapshots/ai-model-snapshots.module';
import { ArtistsModule } from './modules/artists/artists.module';

@Module({
  imports: [
    AuthsModule, 
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.MYSQL_USER || 'postgres',
      password: process.env.MYSQL_PASSWORD || 'postgres',
      database: process.env.MYSQL_DATABASE || 'capstone',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['dist/**/migration/*.js'],
      synchronize: true,
      migrationsRun: false,
      logging: false,
    }),
    StylesModule,
    AiModelsModule,
    AiModelSnapshotsModule,
    ArtistsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
