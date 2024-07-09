import { SaleRepository } from "@/repositories/Sale/SaleRepository";

export class MonthlyExtractUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ month }) {
    const monthly = await this.saleRepository.monthlyExtract(month);

    return monthly;
  }
}
