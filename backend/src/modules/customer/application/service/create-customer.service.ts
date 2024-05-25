import { unprocessableEntityError } from 'src/modules/common/domain';
import { Customer, CustomerRepository } from '../../domain';
import { CreateCustomerDto } from '../dtos';

export class CreateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: CreateCustomerDto): Promise<Customer> {
    const customer = Customer.create(input);

    const dbCustomer = await this.customerRepository.findByDocument(input.cpf);

    if (dbCustomer) {
      throw unprocessableEntityError('CPF já cadastrado na base');
    }
    const result = await this.customerRepository.create(customer);

    return result;
  }
}
