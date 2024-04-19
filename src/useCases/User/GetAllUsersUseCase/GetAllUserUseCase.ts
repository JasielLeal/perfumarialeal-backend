import { IUserRepository } from "@/repositories/User/IUserRepository";

export class GetAllUserUseCase{
    constructor(private userRepository:IUserRepository){}

    async execute(){
        const usersAll = await this.userRepository.listAll()

        return usersAll
    }

}