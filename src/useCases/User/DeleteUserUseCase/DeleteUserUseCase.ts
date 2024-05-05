import { IUserRepository } from "@/repositories/User/IUserRepository";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { ErrorUserDoesNotExist } from "@/erros/ErrorUserDoesNotExist";

export class DeleteUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute({id}:DeleteUserDTO){

        const userExist = await this.userRepository.findById(id)

        if(!userExist){
            throw new ErrorUserDoesNotExist()
        }

        await this.userRepository.delete(id)

        return
    }
}