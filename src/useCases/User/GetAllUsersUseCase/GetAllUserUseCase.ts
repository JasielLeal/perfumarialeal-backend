import { IUserRepository } from "@/repositories/User/IUserRepository";

export class GetAllUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const usersAll = await this.userRepository.listAll();

    const usersWithoutSensitiveInfo = usersAll.map((user) => {
      const { password, resetPasswordToken, ...userWithoutSensitiveInfo } =
        user;
      return userWithoutSensitiveInfo;
    });

    return usersWithoutSensitiveInfo;
  }
}
