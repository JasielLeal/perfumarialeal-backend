import { uuid } from "uuidv4";

export class User {
  public readonly id?: string;
  public name: string;
  public secondName: string;
  public email: string;
  public password: string;
  public role?: string;
  public avatar?: string;
  public resetPasswordToken?: string;
  public createdAt?: Date;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
