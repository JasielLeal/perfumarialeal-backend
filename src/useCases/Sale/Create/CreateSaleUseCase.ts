import { SaleRepository } from "@/repositories/Sale/SaleRepository";

export class CreateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(customerName: string, products: string[]) {

    if(products.length <= 0){
      throw new Error('Nenhum produto informado.')
    }

    const sale = await this.saleRepository.create(customerName, products);

    return sale;
  }
}
