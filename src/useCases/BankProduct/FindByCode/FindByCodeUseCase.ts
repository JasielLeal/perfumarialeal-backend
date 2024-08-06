import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";
import { FindyByCodeDTO } from "./FindByCodeDTO";
import { ErrorBankProductDoesNotExist } from "@/erros/BankProducts/ErrorBankProductDoesNotExist";

export class FindByCodeUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute({ code }: FindyByCodeDTO) {
    const bankProduct = await this.bankProductRepository.findByCode(code);
    if (!bankProduct) {
      throw new ErrorBankProductDoesNotExist()
    }

    return bankProduct;
  }
}
