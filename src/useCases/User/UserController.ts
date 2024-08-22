import { ErrorUserAlreadyExist } from "@/erros/ErrorUserAlreadyExist";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase/CreateUserUseCase";
import { ICreateUserRequestDTO } from "./CreateUserUseCase/CreateUserDTO";
import { PrismaUserRepository } from "@/repositories/User/PrismaUserRepository";
import { ErrorCreditalsInvalid } from "@/erros/ErrorCredetialsInvalid";
import { AuthenticateUseCase } from "./AuthenticateUseCase/AuthenticateUseCase";
import { AuthenticateDTO } from "./AuthenticateUseCase/AuthenticateDTO";
import { ErrorUserDoesNotExist } from "@/erros/ErrorUserDoesNotExist";
import { GetUserUseCase } from "./GetUserUseCase/GetUserUseCase";
import jwt from "jsonwebtoken";
import { GetUserDTO } from "./GetUserUseCase/GetUserDTO";
import { GetAllUserUseCase } from "./GetAllUsersUseCase/GetAllUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase/DeleteUserUseCase";
import { ErrorPermission } from "@/erros/User/ErrorPermission";
import { ForgetPasswordUseCase } from "./ForgetPassword/ForgetPasswordUseCase";
import { ErrorSedingToken } from "@/erros/authenticate/ErrorSedingToken";
import { VerifyPasswordTokenUsecase } from "./VerifyPasswordToken/VerifyPasswordTokenUseCase";
import { ErrorTokenInvalid } from "@/erros/authenticate/ErrorTokenInvalid";
import { UpdatePasswordUseCase } from "./UpdatePasswordUseCase/UpdatePasswordUseCase";

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const prismaUserRepository = new PrismaUserRepository();

      const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

      const {
        name,
        email,
        password,
        avatar,
        secondName,
        role,
      }: ICreateUserRequestDTO = request.body;

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        avatar,
        secondName,
        role,
      });

      return response.status(201).send({ user });
    } catch (err) {
      if (err instanceof ErrorUserAlreadyExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async authenticate(request: Request, response: Response) {
    try {
      const prismaUserRepository = new PrismaUserRepository();
      const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

      const { email, password }: AuthenticateDTO = request.body;

      const user = await authenticateUseCase.execute({
        email,
        password,
      });

      return response.status(201).send({ user });
    } catch (err) {
      if (err instanceof ErrorCreditalsInvalid) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async getUser(request: Request, response: Response) {
    const { authorization } = request.headers;

    try {
      if (!authorization) {
        return response.status(401).json("Token inválido");
      }

      const token = authorization.split(" ")[1];

      const { id } = jwt.verify(
        token,
        process.env.JWT_SECRET ?? ""
      ) as GetUserDTO;

      const prismaUserRepository = new PrismaUserRepository();
      const getUserUseCase = new GetUserUseCase(prismaUserRepository);

      const user = await getUserUseCase.execute({ id });

      user.password = undefined;

      return response.status(201).send(user);
    } catch (err) {
      if (err instanceof ErrorUserDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async getAllUsers(request: Request, response: Response) {
    try {
      const prismaUserRepository = new PrismaUserRepository();
      const getAllUsersUseCase = new GetAllUserUseCase(prismaUserRepository);

      const users = await getAllUsersUseCase.execute();

      return response.status(201).send(users);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userId = request.user.id;

      if (id == userId) {
        throw new Error("Você não pode apagar sua própria conta");
      }

      const prismaUserRepository = new PrismaUserRepository();
      const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);

      await deleteUserUseCase.execute({ id });
      return response.status(201).send();
    } catch (err) {
      if (err instanceof ErrorUserDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      if (err instanceof ErrorPermission) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async forgetPassword(request: Request, response: Response) {
    try {
      const { email } = request.body;

      const prismaUserRepository = new PrismaUserRepository();
      const forgetPasswordUseCase = new ForgetPasswordUseCase(
        prismaUserRepository
      );

      await forgetPasswordUseCase.execute(email);

      return response.status(200).send();
    } catch (err) {
      if (err instanceof ErrorSedingToken || ErrorUserAlreadyExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send(err);
    }
  }

  async VerifyPasswordToken(request: Request, response: Response) {
    try {
      const { token } = request.query;
      const prismaUserRepository = new PrismaUserRepository();
      const verifyPasswordTokenUseCase = new VerifyPasswordTokenUsecase(
        prismaUserRepository
      );

      await verifyPasswordTokenUseCase.execute(token.toString());

      return response.status(200).send("Senha Atualizada com Sucesso");
    } catch (err) {
      if (err instanceof ErrorTokenInvalid) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send(err);
    }
  }

  async UpdatePassword(request: Request, response: Response) {
    try {
      const { token } = request.query;
      const { password } = request.body;

      const prismaUserRepository = new PrismaUserRepository();
      const updatePasswordUseCase = new UpdatePasswordUseCase(
        prismaUserRepository
      );
      
      await updatePasswordUseCase.execute(password, token.toString());

      return response.status(200).send();
    } catch (err) {
      if (err instanceof ErrorTokenInvalid) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send(err);
    }
  }
}
