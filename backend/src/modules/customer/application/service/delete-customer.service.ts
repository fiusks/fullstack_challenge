import { CustomerRepository } from '../../domain';

export class DeleteCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async delete(input: string): Promise<void> {
    await this.customerRepository.delete(input);
  }
}
