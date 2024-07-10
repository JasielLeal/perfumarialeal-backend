import { SaleRepository } from "@/repositories/Sale/SaleRepository";
import { DeleteSaleDTO } from "./DeleteSaleDTO";

export class DeleteSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ saleId }: DeleteSaleDTO) {
    const saleExist = await this.saleRepository.findById(saleId);

    if (!saleExist) {
      throw new Error("Venda não existe");
    }

    const sale = await this.saleRepository.delete(saleId);

    return sale;
  }
}
