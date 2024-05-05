import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";
import { GetPedidoDTO } from "./GetPedidoDTO";
import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";

export class GetPedidoUseCase{
    constructor(private pedidoRepository: IPedidoRepository){}

    async execute({id}:GetPedidoDTO){
        const pedidoExist = await this.pedidoRepository.findById(id)

        if(!pedidoExist){
            throw new ErrorPedidoDoesNotExist()
        }

        return pedidoExist;
    }
}