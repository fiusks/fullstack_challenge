import { notFoundError } from '~/modules/common/domain';
import { Customer, CustomerRepository } from '../../domain';

export class FindCustomerById {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw notFoundError('Customer not found');

    // @ts-expect-error password is private
    // TODO create CustomerDto
    return { ...customer.toJSON(), password: undefined };
  }
}
