import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";

export class BestSellingProductsUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute() {
    const bankProduct = await this.bankProductRepository.bestSellingProducts();

    return bankProduct;
  }
}
