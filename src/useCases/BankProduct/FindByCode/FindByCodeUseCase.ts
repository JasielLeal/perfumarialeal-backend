import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";
import { FindyByCodeDTO } from "./FindByCodeDTO";

export class FindByCodeUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute({ code }: FindyByCodeDTO) {
    const bankProduct = await this.bankProductRepository.findByCode(code);

    if (!bankProduct) {
      throw new Error("Codigo de barra não cadastrado ou não encontrado");
    }

    return bankProduct;
  }
}
