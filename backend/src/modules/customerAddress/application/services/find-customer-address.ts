import { notFoundError } from '../../../common/domain';
import { CustomerAddress, CustomerAddressRepository } from '../../domain';

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
