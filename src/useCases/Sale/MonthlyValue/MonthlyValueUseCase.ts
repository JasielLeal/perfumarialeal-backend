import { SaleRepository } from "@/repositories/Sale/SaleRepository";
import { MonthlyValueDTO } from "./MonthlyValueDTO";

export class MonthlyValueUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ month }: MonthlyValueDTO) {

    const monthly = await this.saleRepository.monthlyValue(month);

    return monthly;
  }
}
