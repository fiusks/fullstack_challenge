import { notFoundError } from '../../../common/domain';
import { CreateCustomerAddressDto } from '../dtos';
import { CustomerAddress } from '../entities';
import { CustomerAddressRepository } from '../repositories';

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
