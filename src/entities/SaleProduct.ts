import { uuid } from "uuidv4";
import { BankProduct } from "./BankProduct";

export class SaleProduct {
  id: string;
  saleId: string;
  bankProductId: string;
  bankProduct: BankProduct;

  constructor(props: Omit<SaleProduct, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
