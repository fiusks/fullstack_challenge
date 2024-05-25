import { CustomerAddressRepository } from '../repositories';

export class DeleteCustomerAddress {
  constructor(
    private readonly customerAddressRepository: CustomerAddressRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.customerAddressRepository.delete(id);
  }
}
