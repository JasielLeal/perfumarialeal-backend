import { IUserRepository } from "@/repositories/User/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { ErrorUserAlreadyExist } from "@/erros/ErrorUserAlreadyExist";
import { hash } from "bcryptjs";

export class CreateUserUseCase{
    
    constructor (private userRepository: IUserRepository){}
    
    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExist = await this.userRepository.findByEmail(data.email)

        if(userAlreadyExist){
            throw new ErrorUserAlreadyExist()
        }

        const passwordHash = await hash(data.password, 6)

        const user = await this.userRepository.save({
            name: data.name,
            email: data.email,
            password: passwordHash, 
            avatar: data.avatar
        })

        return {...user, password: undefined}
    }
}