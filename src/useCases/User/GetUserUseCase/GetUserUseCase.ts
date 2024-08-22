import { IUserRepository } from "@/repositories/User/IUserRepository";
import { GetUserDTO } from "./GetUserDTO";
import { ErrorUserDoesNotExist } from "@/erros/ErrorUserDoesNotExist";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: GetUserDTO) {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new ErrorUserDoesNotExist();
    }

    return {
      ...userExist,
      password: undefined,
      resetPasswordToken: undefined,
      email: undefined,
    };
  }
}
