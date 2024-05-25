import { Customer } from '../../domain';

export class CreateCustomerDto {
  public readonly email: string;
  public readonly username: string;
  public readonly name: string;
  public readonly password: string;
  public readonly cpf: string;
  public readonly birthday: Date | null;
  public readonly phone: string | null;

  constructor(customer: Customer.JSON) {
    this.email = customer.email;
    this.username = customer.username;
    this.name = customer.name;
    this.password = customer.password;
    this.cpf = customer.cpf;
    this.birthday = customer.birthday ?? null;
    this.phone = customer.phone ?? null;
  }
}
