import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";
import { CreateBankProductDTO } from "./CreateBankProductDTO";

export class CreateBankProductUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute({ code, name, value }: CreateBankProductDTO) {
    if (code == null && code == undefined) {
      throw new Error("Informe o codigo");
    }

    const bankProductExist = await this.bankProductRepository.findByCode(code);

    if (bankProductExist) {
      throw new Error("Produto já cadastrado.");
    }

    const formatValue = (value: string) => {
      return parseInt(value.replace(",", ""), 10);
    };

    const newValue = formatValue(value);

    const bankProduct = await this.bankProductRepository.create({
      code,
      name,
      value: newValue.toString(),
    });

    return bankProduct;
  }
}
