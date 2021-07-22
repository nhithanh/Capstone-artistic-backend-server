import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendResetPasswordToUserMail(mail: string, newPassword: string): Promise<void>;
}
