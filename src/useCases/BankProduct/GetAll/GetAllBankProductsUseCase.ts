import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";

export class GetAllBankProductsUseCase {
  constructor(private bankProductsRepository: BankProductRepository) {}

  async execute({search, take, skip}) {
    const bankProducts = await this.bankProductsRepository.findyAll(search, take, skip);
    return bankProducts;
  }
}
