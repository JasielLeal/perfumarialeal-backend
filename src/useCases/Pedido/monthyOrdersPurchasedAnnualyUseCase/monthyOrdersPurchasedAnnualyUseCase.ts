import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";

export class MonthyOrdersPurchasedAnnualyUseCase{
    constructor(private pedidosRepository: IPedidoRepository){}

    async execute(){
        const allPedidos = await this.pedidosRepository.monthyOrdersPurchasedAnnualy()

        return allPedidos
    }
}