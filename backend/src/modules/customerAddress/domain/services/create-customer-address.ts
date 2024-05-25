import { notFoundError } from '../../../common/domain';
import { CustomerAddress } from '../entities';
import { CustomerAddressRepository } from '../repositories';
import { CustomerRepository } from '../../../customer';
import { CreateCustomerAddressDto } from '../dtos';

export class CreateCustomerAddress {
  constructor(
    private readonly customerAddressRepository: CustomerAddressRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(input: CreateCustomerAddressDto): Promise<CustomerAddress> {
    const dbCustomer = await this.customerRepository.findById(input.customerId);

    if (dbCustomer) {
      throw notFoundError('Usuário não encontrado');
    }

    const address = CustomerAddress.create(input);

    return await this.customerAddressRepository.create(address);
  }
}
