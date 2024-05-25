import { Customer, CustomerRepository } from '../../../domain';
import { PrismaCustomer } from './customer-model';
import { PrismaClient } from '@prisma/client';

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaCustomer: PrismaCustomer): Customer {
    const { addresses: prismaAddresses, ...customerData } = prismaCustomer;

    const addresses = (() => {
      if (!prismaAddresses.length) return [];

      return prismaAddresses.map((address) => {
        return {
          ...address,
          customerId: prismaCustomer.id,
        };
      });
    })();

    const creatProps: Customer.CreateProps = {
      ...customerData,
      addresses,
    };

    return Customer.create(creatProps);
  }

  public async create(customer: Customer): Promise<Customer> {
    const { birthday, cpf, email, name, password, phone, username } = customer;

    const dbCustomer = await this.prismaService.customer.create({
      data: {
        cpf: cpf.toJSON(),
        birthdate: birthday,
        email: email.toJSON(),
        name: name,
        phone: phone,
        password: password.toJSON(),
        username,
      },
      include: { addresses: true },
    });

    return this.convert(dbCustomer);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.customer.delete({
      where: { id },
    });

    return;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { id },
      include: { addresses: true },
    });

    if (!customer) return null;

    return this.convert(customer);
  }

  public async findByUsername(username: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { username },
      include: { addresses: true },
    });

    if (!customer) return null;

    return this.convert(customer);
  }

  public async findByDocument(document: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { cpf: document },
      include: { addresses: true },
    });

    if (!customer) return null;

    return this.convert(customer);
  }

  public async update(customer: Customer): Promise<Customer> {
    const dbCustomer = await this.prismaService.customer.update({
      where: { id: customer.id.id },
      data: {
        cpf: customer?.cpf.toJSON(),
        birthdate: customer?.birthday,
        email: customer?.email.toJSON(),
        name: customer?.name,
        phone: customer?.phone,
        password: customer?.password.toJSON(),
      },
      include: { addresses: true },
    });

    return this.convert(dbCustomer);
  }
}
