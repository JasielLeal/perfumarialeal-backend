import { uuid } from "uuidv4";

export class BankProduct {
  public readonly id?: string;
  public name: string;
  public value: string;
  public code: string;
  public createdAt?: Date;

  constructor(props: Omit<BankProduct, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
