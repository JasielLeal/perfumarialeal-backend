import { uuid } from "uuidv4";

export class Product {
  public readonly id?: string;
  public amount: string;
  public name: string;
  public value?: string;
  public valueUnit?: string;
  public pedidoId: string;
  public createdAt?: Date;

  constructor(props: Omit<Product, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
