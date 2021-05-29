import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from "helmet";
import * as cookieParser from 'cookie-parser';
import { nestCsrf } from 'ncsrf';
import * as morgan from 'morgan'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());
  app.use(nestCsrf({ ttl: 86400 }));

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
