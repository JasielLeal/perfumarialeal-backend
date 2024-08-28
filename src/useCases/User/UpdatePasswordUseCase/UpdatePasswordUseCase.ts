import { ErrorTokenInvalid } from "@/erros/authenticate/ErrorTokenInvalid";
import { IUserRepository } from "@/repositories/User/IUserRepository";
import { GenereteForgetTokenPassword } from "@/utils/GenereteForgetTokenPassword";
import { hash } from "bcryptjs";

export class UpdatePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(password: string, token: string) {
    const verifyToken = await this.userRepository.findByResetToken(token);

    if (!verifyToken) {
      throw new ErrorTokenInvalid();
    }

    const newPassword = await hash(password, 6);
    const resetPasswordToken = null;
    await this.userRepository.updatePassword(verifyToken.id, newPassword);
    await this.userRepository.ForgetPassword(
      verifyToken.id,
      resetPasswordToken
    );

    return;
  }
}
