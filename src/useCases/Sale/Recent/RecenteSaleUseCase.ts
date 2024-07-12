import { SaleRepository } from "@/repositories/Sale/SaleRepository";

export class RecentSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute() {
    const sale = await this.saleRepository.recent();

    return sale;
  }
}
