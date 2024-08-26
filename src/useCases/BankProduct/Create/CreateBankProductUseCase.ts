import { BankProductRepository } from "@/repositories/bankProduct/bankProductRepository";
import { CreateBankProductDTO } from "./CreateBankProductDTO";
import { ErrorReportTheCoding } from "@/erros/BankProducts/ErrorReportTheCoding";
import { ErrorBankProductDoesExist } from "@/erros/BankProducts/ErrorBankProductDoesExist";

export class CreateBankProductUseCase {
  constructor(private bankProductRepository: BankProductRepository) {}

  async execute({ code, name, value }: CreateBankProductDTO) {
    if (code == null && code == undefined) {
      throw new ErrorReportTheCoding();
    }

    const bankProductExist = await this.bankProductRepository.findByCode(code);

    if (bankProductExist) {
      throw new ErrorBankProductDoesExist();
    }

    const formatValue = (value: string) => {
      // Remove todos os pontos e vírgulas
      return parseInt(value.replace(/\./g, "").replace(",", ""), 10);
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
