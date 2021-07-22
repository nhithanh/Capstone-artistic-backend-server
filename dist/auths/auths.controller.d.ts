import { AuthsService } from './auths.service';
export declare class AuthsController {
    authService: AuthsService;
    login(req: any): Promise<any>;
}
