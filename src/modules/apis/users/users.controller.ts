import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../../auths/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req) {
    console.log(req.user)
    return this.usersService.findOne(req.user.id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/self')
  getSelfInformation(@Req() req) {
    return req.user
  }
}
