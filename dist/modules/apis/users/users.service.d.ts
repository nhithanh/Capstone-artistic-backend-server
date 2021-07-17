import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    private readonly albumService;
    private verifyEmailExist;
    create(createUserDto: CreateUserDto): Promise<User>;
    findByCredential(email: string, password: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    updateUserProfile(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<User>;
}
