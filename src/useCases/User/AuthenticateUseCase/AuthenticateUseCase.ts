import { IUserRepository } from "@/repositories/User/IUserRepository";
import { AuthenticateDTO } from "./AuthenticateDTO";
import { ErrorCreditalsInvalid } from "@/erros/ErrorCredetialsInvalid";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthenticateUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: AuthenticateDTO) {
    const userAlreadExist = await this.userRepository.findByEmail(email);

    if (!userAlreadExist) {
      throw new ErrorCreditalsInvalid();
    }

    const doesPasswordMatch = await compare(password, userAlreadExist.password);

    if (!doesPasswordMatch) {
      throw new ErrorCreditalsInvalid();
    }

    const token = jwt.sign(
      { id: userAlreadExist.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "8h",
      }
    );

    return { token, ...userAlreadExist, password: undefined, email: undefined, resetPasswordToken: undefined };
  }
}
