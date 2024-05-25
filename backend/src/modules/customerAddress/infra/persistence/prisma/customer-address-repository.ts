import { CustomerAddress, CustomerAddressRepository } from '../../../domain/';
import { PrismaCustomerAddress } from './customer-address.model';
import { PrismaClient } from '@prisma/client';

export class PrismaCustomerAddressRepository
  implements CustomerAddressRepository
{
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaAddress: PrismaCustomerAddress): CustomerAddress {
    return CustomerAddress.create({
      ...prismaAddress,
      zipCode: prismaAddress.zipCode,
      neighborhood: prismaAddress.neighborhood,
    });
  }

  public async create(
    customerAddress: CustomerAddress,
  ): Promise<CustomerAddress> {
    const dbCustomerAddress = await this.prismaService.address.create({
      data: {
        ...customerAddress.toJSON(),
        customerId: customerAddress.customerId.id,
        neighborhood: customerAddress.neighborhood,
        zipCode: customerAddress.zipCode,
        id: customerAddress.id.id,
      },
    });

    return this.convert(dbCustomerAddress);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.address.delete({
      where: { id },
    });

    return;
  }

  public async findByCustomerId(id: string): Promise<CustomerAddress | null> {
    const customerAddresses = await this.prismaService.address.findFirst({
      where: { customerId: id },
    });

    if (!customerAddresses) {
      return null;
    }

    return this.convert(customerAddresses);
  }

  public async update(
    customerAddress: CustomerAddress,
  ): Promise<CustomerAddress> {
    const dbCustomerAddress = await this.prismaService.address.update({
      where: { id: customerAddress.id.id },

      data: {
        ...customerAddress.toJSON(),
        customerId: customerAddress.customerId.id,
        neighborhood: customerAddress.neighborhood,
        zipCode: customerAddress.zipCode,
      },
    });

    return this.convert(dbCustomerAddress);
  }
}
