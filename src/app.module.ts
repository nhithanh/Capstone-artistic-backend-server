import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './modules/apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StylesModule } from './modules/apis/styles/styles.module';
import { AiModelsModule } from './modules/apis/ai-models/ai-models.module';
import { AiModelSnapshotsModule } from './modules/apis/ai-model-snapshots/ai-model-snapshots.module';
import { ArtistsModule } from './modules/apis/artists/artists.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PhotosModule } from './modules/apis/photos/photos.module'
import { TranferImagesModule } from './modules/apis/tranfer-images/tranfer-images.module';
import { HelloGateway } from './modules/gateways/hello/hello.gateway';
import { ProducerService } from './modules/producer/producer.service';
import { ProducerModule } from './modules/producer/producer.module';
import { ControllerController } from './modules/consumers/controller/controller.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'C:\\Users\\enka\\Desktop\\public'
    }),    
    ProducerModule,
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
    PhotosModule,
    TranferImagesModule
  ],
  controllers: [AppController, ControllerController],
  providers: [AppService, HelloGateway, ProducerService],
})
export class AppModule {}
