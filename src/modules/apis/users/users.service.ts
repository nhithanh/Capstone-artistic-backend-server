import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as _ from 'lodash'

@Injectable()
export class UsersService {

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>

  @Inject()
  private readonly albumService: AlbumsService;

  private async verifyIsUsernameExist(username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        username
      }
    });
    if(user) {
      return true;
    }
    return false;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUsernameAlreadyExist = await this.verifyIsUsernameExist(createUserDto.username)
    if(isUsernameAlreadyExist) {
      throw new HttpException({
        status: 409,
        message: 'Username already taken!'
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

  async findByCredential(username: string, password: string): Promise<User | null> {
    console.log("username:", username)
    console.log("password:", password)
    const user = await this.usersRepository.findOne({
      where: {
        username
      },
      select: ['password', "id", "username", "defaultAlbumId"]
    })

    if(!user) {
      return null
    }
    
    const isPasswordMatch = user.comparePassword(password)
    console.log(isPasswordMatch)
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
}
