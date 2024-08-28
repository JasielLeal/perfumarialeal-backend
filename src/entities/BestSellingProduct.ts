import { uuid } from "uuidv4";

export class BestSellingProduct {
  public readonly id?: string;
  public name: string;
  public value: string;
  public code: string;
  public createdAt?: Date;
  _count: {
    SaleProduct: number;
  };

  constructor(props: Omit<BestSellingProduct, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
