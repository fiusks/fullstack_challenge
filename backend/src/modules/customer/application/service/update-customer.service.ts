import { unprocessableEntityError } from '~/modules/common/domain';
import { Customer, CustomerRepository } from '../../domain';
import { UpdateCustomerDto } from '../dtos';

export class UpdateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(props: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findById(props.id);

    if (!customer) {
      throw unprocessableEntityError('Usuário não encontrado');
    }

    customer.updateProfile({ ...props, address: null });

    return this.customerRepository.update(customer);
  }
}
