import { uuid } from "uuidv4";

export class Pedidos {
  public readonly id: string;
  public company: string;
  public cycle: string;
  public value: string;
  public userId: string;
  public createdAt: Date;

  constructor(props: Omit<Pedidos, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
