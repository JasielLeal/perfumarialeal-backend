import { SaleRepository } from "@/repositories/Sale/SaleRepository";

export class ExtractOfTheDayUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute() {
    const sale = await this.saleRepository.extractOfTheDay();

    return sale;
  }
}
