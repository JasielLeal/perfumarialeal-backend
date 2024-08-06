import { ErrorBankProductDoesNotExist } from "@/erros/BankProducts/ErrorBankProductDoesNotExist";
import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";

export class SoftDeletUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute(code: string) {
    const bankProductExist = await this.bankProductRepository.findByCode(code);

    if (!bankProductExist) {
      throw new ErrorBankProductDoesNotExist();
    }

    await this.bankProductRepository.SoftDelet(code);
  }
}
