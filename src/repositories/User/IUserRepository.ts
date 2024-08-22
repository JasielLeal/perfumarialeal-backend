import { User } from "@/entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  listAll(): Promise<User[]>;
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
  ForgetPassword(id: string, resetToken: string): Promise<User | null>;
  updatePassword(id: string, password: string): Promise<User | null>;
  findByResetToken(resetToken: string): Promise<User | null>;
}
