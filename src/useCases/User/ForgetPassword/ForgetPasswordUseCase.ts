import { IUserRepository } from "@/repositories/User/IUserRepository";
import { ErrorUserAlreadyNotExist } from "@/erros/User/ErrorUserAlreadyNotExist";
import { GenereteForgetTokenPassword } from "@/utils/GenereteForgetTokenPassword";
import nodemailer from "nodemailer";
import { ErrorSedingToken } from "@/erros/authenticate/ErrorSedingToken";

export class ForgetPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string) {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new ErrorUserAlreadyNotExist();
    }

    const resetPasswordToken = GenereteForgetTokenPassword(5);

    const resetLink = `http://localhost:5173/recovery-password?token=${resetPasswordToken}`;
    await this.userRepository.ForgetPassword(userExist.id, resetPasswordToken);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      const mailOptions = {
        to: userExist.email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset",
        html: `
          <html>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
            <table align="center" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
                  <h1 style="margin: 0;">Password Reset</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Hello ${userExist.name} ${userExist.secondName},
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Você está recebendo este e-mail porque você (ou outra pessoa) solicitou uma redefinição de senha para sua conta.
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Use o link a seguir para redefinir sua senha:
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    <a href="${resetLink}" style="color: #007bff; text-decoration: none; font-weight: bold;">Reset Password</a>
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Este link expirará em 1 hora. Se você não solicitou isso, ignore este e-mail e sua senha permanecerá inalterada
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Atenciosamente,<br>Leal Perfumaria.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f5f5f5; padding: 10px; text-align: center;">
                  <p style="font-size: 12px; color: #999999; margin: 0;">
                    &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);

      return;
    } catch (err) {
      throw new ErrorSedingToken();
    }
  }
}
