import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly mailService;
    constructor(usersService: UsersService);
    getUserProfile(req: any): Promise<import("./entities/user.entity").User>;
    updateUserProfile(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    getSelfInformation(req: any): any;
    resetUserPassword(): void;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    changeUserPassword(req: any, body: any): Promise<import("./entities/user.entity").User>;
}
