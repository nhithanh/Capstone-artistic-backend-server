import { Controller, Get, Post, Body, Param, Req, UseGuards, Put, Inject, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../../auths/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto'
import { MailService } from 'src/mail/mail.service';
import { Query } from '@nestjs/common';
import {parseJwt} from './util'
import { HttpException } from '@nestjs/common';
import axios from 'axios';

@ApiTags("users")
@Controller('users')
export class UsersController {

  @Inject()
  private readonly mailService: MailService;

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

  @UseGuards(JwtAuthGuard)
  @Get('/self')
  getSelfInformation(@Req() req) {
    return req.user
  }

  @Get('/reset-password')
  resetUserPassword(@Query('email') email: string) {
    return this.usersService.resetPassword(email)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changeUserPassword(@Req() req, @Body() body) {
    const oldPassword = body['oldPassword']
    const newPassword = body['newPassword']
    return this.usersService.changePassword(req.user.id, oldPassword, newPassword)
  }

  @Post('/login-google')
  async loginByGoogle(@Body() body: any) {
    const tokenId = body['tokenId']
    
    let { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',
      {
          headers: {
              Authorization: `Bearer ${tokenId}`
          }
      }
    );
    if(data) {
      const token = await this.usersService.handleGoogleLogin(data)
      return token
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
  }
}
