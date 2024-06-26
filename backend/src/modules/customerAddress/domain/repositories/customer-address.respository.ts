import { CustomerAddress } from '../entities';

export interface CustomerAddressRepository {
  create(input: CustomerAddress): Promise<CustomerAddress>;
  findByCustomerId(customerId: string): Promise<CustomerAddress | null>;
  update(customer: Partial<CustomerAddress>): Promise<CustomerAddress>;
  delete(id: string): Promise<void>;
}
