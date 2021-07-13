import { Controller, Get, Post, Body, Param, Req, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../../auths/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto'


@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Req() req) {
    return this.usersService.findOne(req.user.id)
  }

  @Put("/profile")
  @UseGuards(JwtAuthGuard)
  updateUserProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserProfile(req.user.id, updateUserDto)
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
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/self')
  getSelfInformation(@Req() req) {
    return req.user
  }
  

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changeUserPassword(@Req() req, @Body() body) {
    const oldPassword = body['oldPassword']
    const newPassword = body['newPassword']
    this.usersService
    return req.user
  }
}
