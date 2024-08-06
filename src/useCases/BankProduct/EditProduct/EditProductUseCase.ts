import { ErrorBankProductDoesNotExist } from "@/erros/BankProducts/ErrorBankProductDoesNotExist";
import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";

export class EditProductUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute(id: string, code: string, name: string, value: string) {
    const bankProductExist = await this.bankProductRepository.findById(id);

    if (!bankProductExist) {
      throw new ErrorBankProductDoesNotExist();
    }

    const numericValue = parseInt(value.replace(",", ""), 10);

    await this.bankProductRepository.editProduct(
      id,
      code,
      name,
      numericValue.toString()
    );

    return;
  }
}
