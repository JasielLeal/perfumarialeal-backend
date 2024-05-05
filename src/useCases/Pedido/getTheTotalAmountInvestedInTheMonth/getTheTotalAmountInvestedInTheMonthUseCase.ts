import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";

export class GetTheTotalAmountInvestedInTheMonthUseCase{
    constructor(private pedidosRepository:IPedidoRepository){}

    async execute (){
        const pedidosCount = await this.pedidosRepository.getTheTotalAmountInvestedInTheMonth()

        return pedidosCount
    }
}