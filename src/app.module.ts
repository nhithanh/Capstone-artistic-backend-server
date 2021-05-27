import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './modules/apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StylesModule } from './modules/apis/styles/styles.module';
import { AiModelsModule } from './modules/apis/models/models.module';
import { AiModelSnapshotsModule } from './modules/apis/snapshots/snapshot.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PhotosModule } from './modules/apis/photos/photos.module'
import { TranferImagesModule } from './modules/apis/tranfer-images/tranfer-images.module';
import { ProducerModule } from './modules/producer/producer.module';
import { ControllerController } from './modules/consumers/controller/controller.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from './gateway/app.gateway';
import { SocketModule } from './gateway/socket.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { PhotoLocalModule } from './modules/apis/photo-local/photo-local.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: process.env.STATIC_DIR
    }),    
    ProducerModule,
    AuthsModule, 
    UsersModule, 
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
    PhotosModule,
    TranferImagesModule,
    SocketModule,
    S3Module,
    PhotoLocalModule
  ],
  controllers: [AppController, ControllerController],
  providers: [AppService, AppGateway]
})
export class AppModule {}
