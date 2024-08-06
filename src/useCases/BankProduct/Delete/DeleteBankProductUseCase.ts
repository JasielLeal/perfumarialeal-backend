import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";
import { DeleteBankProductDTO } from "./DeleteBankProductDTO";
import { ErrorBankProductDoesNotExist } from "@/erros/BankProducts/ErrorBankProductDoesNotExist";

export class DeleteBankProductUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute({ code }: DeleteBankProductDTO) {
    
    const bankProduct = await this.bankProductRepository.findByCode(code);

    if (!bankProduct) {
      throw new ErrorBankProductDoesNotExist()
    }

    await this.bankProductRepository.delete(code);

    return;
  }
}
