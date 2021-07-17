import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}
  @Get('/')
  responseFromServer() {
    return {
      message: "Hello"
    }
  }

}
