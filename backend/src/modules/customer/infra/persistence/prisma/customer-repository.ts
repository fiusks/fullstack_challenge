import { Customer, CustomerRepository } from '../../../domain';
import { PrismaCustomer } from './customer-model';
import { PrismaClient } from '@prisma/client';

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaCustomer: PrismaCustomer): Customer {
    return Customer.create({
      ...prismaCustomer,
      birthday: prismaCustomer.birthdate,
      phone: prismaCustomer.phone,
      address: prismaCustomer.address,
    });
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
      include: { address: true },
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
      include: { address: true },
    });
    console.log(
      '🚀 ~ PrismaCustomerRepository ~ findById ~ customer:',
      customer,
    );

    if (!customer) return null;

    return this.convert(customer);
  }

  public async findByUsername(username: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { username },
      include: { address: true },
    });

    if (!customer) return null;

    return this.convert(customer);
  }

  public async findByDocument(document: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { cpf: document },
      include: { address: true },
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
      include: { address: true },
    });

    return this.convert(dbCustomer);
  }
}
