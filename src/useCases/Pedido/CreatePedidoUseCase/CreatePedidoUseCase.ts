import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";
import { CreatePedidosDTO } from "./CreatePedidoDTO";

export class CreatePedidoUseCase{
    constructor(private pedidoRepository: IPedidoRepository){}

    async execute(data:CreatePedidosDTO){


        const cleanedValue = data.value.replace(/[^0-9]/g, '');

        const pedido = await this.pedidoRepository.create({
            company: data.company,
            cycle: data.cycle,
            userId: data.userId,
            value: cleanedValue
        })

        return pedido
    }
}