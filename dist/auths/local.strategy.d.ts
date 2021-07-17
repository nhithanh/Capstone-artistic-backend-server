import { AuthsService } from './auths.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private readonly userService;
    constructor(authService: AuthsService);
    validate(username: string, password: string): Promise<any>;
}
export {};
