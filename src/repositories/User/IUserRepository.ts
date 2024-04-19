import { User } from "@/entities/User";

export interface IUserRepository{
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>
    listAll(): Promise<User[]>
    save(data: User): Promise<User>
}