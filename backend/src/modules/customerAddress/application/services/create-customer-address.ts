import { CustomerAddress, CustomerAddressRepository } from '../../domain';
import { CreateCustomerAddressDto } from '../dtos';
import { notFoundError } from '../../../common/domain';
import { CustomerRepository } from '~/modules/customer/domain';

export class CreateCustomerAddress {
  constructor(
    private readonly customerAddressRepository: CustomerAddressRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(input: CreateCustomerAddressDto): Promise<CustomerAddress> {
    const dbCustomer = await this.customerRepository.findById(input.customerId);

    if (!dbCustomer) {
      throw notFoundError('Usuário não encontrado');
    }

    const address = CustomerAddress.create(input);

    return await this.customerAddressRepository.create(address);
  }
}
