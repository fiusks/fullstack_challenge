import { CustomerAddress } from '../entities';

export class CreateCustomerAddressDto {
  public readonly customerId: string;
  public readonly zipCode: string;
  public readonly street: string;
  public readonly neighborhood: string;
  public readonly city: string;
  public readonly number: string;
  public readonly complement: string;
  public readonly state: string;

  constructor(address: CustomerAddress, customerId: string) {
    this.city = address.city;
    this.complement = address.complement;
    this.customerId = customerId;
    this.neighborhood = address.neighborhood;
    this.number = address.number;
    this.state = address.state;
    this.street = address.street;
    this.zipCode = address.zipCode;
  }
}
