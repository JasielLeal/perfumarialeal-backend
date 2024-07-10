import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";
import { DeleteBankProductDTO } from "./DeleteBankProductDTO";

export class DeleteBankProductUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute({ code }: DeleteBankProductDTO) {
    
    const bankProduct = await this.bankProductRepository.findByCode(code);

    if (!bankProduct) {
      throw new Error("Produto não existe");
    }

    await this.bankProductRepository.delete(code);

    return;
  }
}
