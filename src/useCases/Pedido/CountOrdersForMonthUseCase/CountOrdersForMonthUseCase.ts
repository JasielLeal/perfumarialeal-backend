import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";

export class CountOrdersForMonthUseCase{
    constructor(private pedidoRepository:IPedidoRepository){}

    async execute(){
        const countPedidos = await this.pedidoRepository.countOrdersForMonth()

        return countPedidos
    }
}