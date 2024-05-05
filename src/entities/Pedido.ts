import { Product } from "@prisma/client";
import { uuid } from "uuidv4";

export class Pedidos {
  public readonly id?: string;
  public company: string;
  public cycle: string;
  public value: string;
  public product?: Product[]
  public userId: string;
  public createdAt?: any;

  constructor(props: Omit<Pedidos, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
