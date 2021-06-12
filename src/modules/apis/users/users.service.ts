import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>
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
    const newUser = this.usersRepository.create(createUserDto)
    const userId = newUser.id
    await this.albumService.create({
      name: 'Default',
      userId: userId
    })
    return this.usersRepository.save(newUser)
  }

  async findByCredential(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        username
      },
      select: ['password', "id", "username"]
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
}
