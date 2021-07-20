import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as _ from 'lodash'
import {generate} from 'generate-password'
import { MailService } from 'src/mail/mail.service';
import { AuthsService } from 'src/auths/auths.service';

@Injectable()
export class UsersService {

  @Inject(forwardRef(() => AuthsService))
  private readonly authsService: AuthsService;

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>

  @Inject()
  private readonly albumService: AlbumsService;

  @Inject()
  private readonly mailService: MailService;

  private async verifyEmailExist(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        email
      }
    });
    if(user) {
      return true;
    }
    return false;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isEmailAlreadyExist = await this.verifyEmailExist(createUserDto.email)
    if(isEmailAlreadyExist) {
      throw new HttpException({
        status: 409,
        message: 'Email already taken!'
      }, HttpStatus.CONFLICT)
    }
    let newUser = this.usersRepository.create(createUserDto)
    newUser = await this.usersRepository.save(newUser)
    const newAlbum = await this.albumService.create({
      name: 'Default',
      userId: newUser.id
    })    
    newUser.defaultAlbumId = newAlbum.id
    return this.usersRepository.save(_.omit(newUser, ['password']))
  }

  async findByCredential(email: string, password: string): Promise<User | null> {
    console.log("Call")
    const user = await this.usersRepository.findOne({
      where: {
        email
      },
      select: ['password', "id", "email", "defaultAlbumId"]
    })

    if(!user) {
      return null
    }
    
    const isPasswordMatch = user.comparePassword(password)
    if(!isPasswordMatch) {
      return null
    }

    return user
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id
      }
    })
  }

  async updateUserProfile(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.findOne(id)
    return this.usersRepository.save({
      ...updateUser,
      ...updateUserDto
    })
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId
      },
      select: ['id', 'password']
    })
    
    const isPasswordMatch = user.comparePassword(oldPassword)

    if(!isPasswordMatch) {
      throw new HttpException(
        {
          statusCode: 400,
          message: `Password not correct`,
        },
        HttpStatus.BAD_REQUEST,
      );    
    }
    user.password = newPassword
    return this.usersRepository.save(user)
  }

  async resetPassword(email: string) {
    const user = await this.usersRepository.findOne({
      email: email
    })

    if(user) {
      const newPassword = generate({
        length: 10,
        numbers: true
      })

      user.password = newPassword

      await this.usersRepository.save(user)
      await this.mailService.sendResetPasswordToUserMail(email, newPassword)
      return {"message": "reset password success"}
    } else {
      throw new HttpException(
        {
          statusCode: 404,
          message: `Email not found!`,
        },
        HttpStatus.NOT_FOUND,
      )
    }
  }

  async handleGoogleLogin({email, given_name, family_name}) {
    const user = await this.usersRepository.findOne({email})
    if(user) {
      const token = await this.authsService.genToken(user)
      return token
    }
    let newUser = this.usersRepository.create({
      email,
      firstName: given_name,
      lastName: family_name,
    })
    newUser = await this.usersRepository.save(newUser)
    const newAlbum = await this.albumService.create({
      name: 'Default',
      userId: newUser.id
    })
    newUser.defaultAlbumId = newAlbum.id
    newUser = await this.usersRepository.save(newUser)
    const token = await this.authsService.genToken(newUser)
    return token
  }
}
