import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/apis/users/entities/user.entity';
export declare class AuthsService {
    private jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    genToken(user: User): Promise<{
        token: string;
    }>;
}
