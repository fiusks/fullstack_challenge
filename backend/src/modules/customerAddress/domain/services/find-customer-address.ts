import { notFoundError } from '../../../common/domain';
import { CustomerAddress } from '../entities';
import { CustomerAddressRepository } from '../repositories';

export class FindCustomerAddress {
  constructor(
    private readonly customerAddressRepository: CustomerAddressRepository,
  ) {}

  async execute(input: string): Promise<CustomerAddress> {
    const customerAddress =
      await this.customerAddressRepository.findByCustomerId(input);

    if (!customerAddress) {
      throw notFoundError('Endereço não encontrado');
    }

    return customerAddress;
  }
}
