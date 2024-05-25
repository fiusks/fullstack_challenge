import { notFoundError } from '../../../common/domain';
import { CustomerAddress, CustomerAddressRepository } from '../../domain';
import { CreateCustomerAddressDto } from '../dtos';

export class UpdateCustomerAddress {
  constructor(
    private readonly customerAddressRepository: CustomerAddressRepository,
  ) {}

  async execute(input: CreateCustomerAddressDto): Promise<CustomerAddress> {
    const customerAddress =
      await this.customerAddressRepository.findByCustomerId(input.customerId);

    if (!customerAddress) {
      throw notFoundError('Endereço não encontrado');
    }

    customerAddress.update(input);

    return customerAddress;
  }
}
