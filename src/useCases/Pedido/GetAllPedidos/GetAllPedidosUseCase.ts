import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";

export class GetAllPedidosUseCase {
  constructor(private pedidosRepository: IPedidoRepository) {}

  async execute({ take, skip, company}) {
    const pedidos = await this.pedidosRepository.getAll(take, skip, company);

    return pedidos;
  }
}
