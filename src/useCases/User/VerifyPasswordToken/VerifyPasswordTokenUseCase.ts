import { ErrorTokenInvalid } from "@/erros/authenticate/ErrorTokenInvalid";
import { IUserRepository } from "@/repositories/User/IUserRepository";

export class VerifyPasswordTokenUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(token: string) {
    const user = await this.userRepository.findByResetToken(token);

    if (!user) {
      throw new ErrorTokenInvalid();
    }
    return;
  }
}
