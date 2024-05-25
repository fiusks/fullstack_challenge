import { Customer } from '../../domain';

export class CreateCustomerDto {
  public readonly email: string;
  public readonly username: string;
  public readonly name: string;
  public readonly password: string;
  public readonly cpf: string;
  public readonly birthday?: Date;
  public readonly phone?: string;

  constructor(customer: Customer.JSON) {
    this.email = customer.email;
    this.username = customer.username;
    this.name = customer.name;
    this.password = customer.password;
    this.cpf = customer.cpf;
    this.birthday = customer.birthday;
    this.phone = customer.phone;
  }
}
