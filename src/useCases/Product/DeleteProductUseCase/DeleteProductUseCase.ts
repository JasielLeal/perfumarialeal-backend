import { IProductsRepository } from "@/repositories/Products/IProductsRepository";
import { DeleteProductDTO } from "./DeleteProductDTO";
import { ErrorProductDoesNotExist } from "@/erros/ErrorProductDoesNotExist";

export class DeleteProductUseCase {
  constructor(private productRepository: IProductsRepository) {}

  async execute({ id }: DeleteProductDTO) {
    const productExist = await this.productRepository.findById(id);

    if (!productExist) {
      throw new ErrorProductDoesNotExist();
    }

    const product = await this.productRepository.delete(id);

    return product;
  }
}
