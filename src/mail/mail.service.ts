import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendResetPasswordToUserMail(mail: string, newPassword: string) {    
        await this.mailerService.sendMail({
          to: mail,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: '[Artistic Mobile App] Your new password!',
          template: './mail/templates/reset-password',
          context: { // ✏️ filling curly brackets with content
            newPassword
          },
        });
      }
}
