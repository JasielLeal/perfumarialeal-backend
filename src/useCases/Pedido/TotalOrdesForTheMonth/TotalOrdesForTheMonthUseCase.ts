import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";

export class TotalOrdersForTheMonthUseCase{
    constructor(private pedidoRepository: IPedidoRepository){}

    async execute(){
        const totalOrders = await this.pedidoRepository.getTotalOrdersForTheMonth()
        return totalOrders
    }
}