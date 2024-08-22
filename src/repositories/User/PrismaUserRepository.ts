import { User } from "@/entities/User";
import { IUserRepository } from "./IUserRepository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async save(data: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        avatar: data.avatar,
        secondName: data.secondName,
        role: data.role,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    const userExist = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return userExist;
  }

  async listAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();

    return allUsers;
  }

  async delete(id: string): Promise<void> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return;
  }

  async ForgetPassword(id: string, resetToken: string): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        resetPasswordToken: resetToken,
      },
    });

    return user;
  }

  async updatePassword(id: string, password: string): Promise<User | null> {
    const newPassword = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return newPassword;
  }

  async findByResetToken(resetToken: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: resetToken,
      },
    });
    return user;
  }
}
