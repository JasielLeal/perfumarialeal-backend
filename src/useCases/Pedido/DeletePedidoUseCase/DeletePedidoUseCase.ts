import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";
import { DeletePedidoDTO } from "./DeletePedidoDTO";
import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";

export class DeletePedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute({ pedidoId }: DeletePedidoDTO) {
    const pedidoExist = await this.pedidoRepository.findById(pedidoId);

    if (!pedidoExist) {
      throw new ErrorPedidoDoesNotExist();
    }

    await this.pedidoRepository.delete(pedidoId);

    return;
  }
}
