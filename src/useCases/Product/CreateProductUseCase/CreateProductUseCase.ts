import { IProductsRepository } from "@/repositories/Products/IProductsRepository";
import { CreateProductDTO } from "./CreateProductDTO";
import { IPedidoRepository } from "@/repositories/Pedido/IPedidoRepository";
import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";

export class CreateProductUseCase {
  constructor(
    private productRepository: IProductsRepository,
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute(data: CreateProductDTO) {
    const pedidoExist = await this.pedidoRepository.findById(data.pedidoId);

    if (!pedidoExist) {
      throw new ErrorPedidoDoesNotExist();
    }

    const cleanedValue = data.value.replace(/[^0-9]/g, '');

    let value = Number(cleanedValue);
    let amount = Number(data.amount);

    if (isNaN(value) || isNaN(amount) || amount === 0) {
      value = NaN;
    }

    let valueUnit = value / amount;

    valueUnit = parseFloat(valueUnit.toFixed(2));

    const product = await this.productRepository.create({
      amount: data.amount,
      name: data.name,
      pedidoId: data.pedidoId,
      value: cleanedValue,
      valueUnit: valueUnit.toString(),
    });

    return product;
  }
}
