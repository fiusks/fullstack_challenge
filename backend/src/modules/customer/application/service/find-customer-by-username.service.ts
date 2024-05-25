import { Customer, CustomerRepository } from '../../domain';

export class FindCustomerByUsername {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: string): Promise<Customer | null> {
    return await this.customerRepository.findByUsername(input);
  }
}
