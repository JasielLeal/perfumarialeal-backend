export interface ICreateUserRequestDTO {
  readonly id?: string;
  name: string;
  secondName: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  resetPasswordToken?: string;
  createdAt?: Date;
}
