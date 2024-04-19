import { User } from "@/entities/User";
import { IUserRepository } from "../IUserRepository";
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
      },
    });
    return user;
  }

  async findById(id: string): Promise<User> {

    const userExist = await prisma.user.findUnique({
      where:{
        id
      }
    })

    return userExist
  }

  async listAll(): Promise<User[]> {
    
    const allUsers = await prisma.user.findMany()
  
    return allUsers
  }
}
