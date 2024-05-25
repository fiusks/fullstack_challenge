import { CustomerAddress } from '../entities';

export interface CustomerAddressRepository {
  create(input: CustomerAddress): Promise<CustomerAddress>;
  findAllByCustomerId(customerId: string): Promise<CustomerAddress[]>;
  update(customer: Partial<CustomerAddress>): Promise<CustomerAddress>;
  delete(id: string): Promise<void>;
}
