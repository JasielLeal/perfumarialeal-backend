import { uuid } from "uuidv4";
import { SaleProduct } from "./SaleProduct";

export class Sale {
  id: string;
  customerName: string;
  createdAt: Date;
  saleProduct: SaleProduct[];
  value: string;
  transictionType: string;

  constructor(props: Omit<Sale, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
