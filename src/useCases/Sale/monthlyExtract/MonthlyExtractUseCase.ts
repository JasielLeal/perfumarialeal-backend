import { SaleRepository } from "@/repositories/Sale/SaleRepository";

export class MonthlyExtractUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ month, search, take, skip }) {
    const monthly = await this.saleRepository.monthlyExtract(
      month,
      search,
      take,
      skip
    );

    return monthly;
  }
}
