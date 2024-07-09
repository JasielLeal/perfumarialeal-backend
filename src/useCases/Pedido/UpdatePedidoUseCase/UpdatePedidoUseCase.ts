import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";
import { UpdatePedidoDTO } from "./UpdatePedidoDTO";

export class UpdatePedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute({ company, cycle, pedidoId, value }: UpdatePedidoDTO) {
    if (pedidoId == undefined && pedidoId == null) {
      throw new Error("Pedido não existe");
    }

    const pedidoExist = await this.pedidoRepository.findById(pedidoId);

    if (!pedidoExist) {
      throw new Error("Pedido não existe");
    }

    await this.pedidoRepository.update(pedidoId, company, cycle, value);
  }
}
