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
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UploadImagesModule } from './modules/upload-images/upload-images.module';
import { TranferImagesModule } from './modules/tranfer-images/tranfer-images.module';

@Module({
  imports: [
    AuthsModule, 
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'capstone',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['dist/**/migration/*.js'],
      synchronize: true,
      migrationsRun: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
    }),
    StylesModule,
    AiModelsModule,
    AiModelSnapshotsModule,
    ArtistsModule,
    UploadImagesModule,
    TranferImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
