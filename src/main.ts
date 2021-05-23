import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from "helmet";
import * as cookieParser from 'cookie-parser';
import { nestCsrf } from 'ncsrf';
import * as morgan from 'morgan'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'


async function bootstrap() {
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


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: { 
      urls: ['amqp://localhost:5672'],
      queue: 'test_queue',
      queueOptions: {
        durable: false
      }
    }
  })
  
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
