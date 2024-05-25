import { Customer } from '../entities';

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findByUsername(username: string): Promise<Customer | null>;
  findByDocument(document: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  update(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
}
