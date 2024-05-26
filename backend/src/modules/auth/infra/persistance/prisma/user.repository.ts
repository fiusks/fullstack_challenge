import { PrismaClient } from '@prisma/client';
import { UserRepository, User } from '~/modules/auth/domain';
import { PrismaCustomer } from '~/modules/customer';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaCustomer: PrismaCustomer): User {
    return User.create({
      ...prismaCustomer,
      hashedPassword: prismaCustomer.password,
    });
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.customer.findFirst({
      where: { email },
      include: { address: true },
    });

    if (!user) return null;

    return this.convert(user);
  }

  public async hasByCpf(cpf: string): Promise<boolean> {
    const cpfCount = await this.prismaService.customer.count({
      where: { cpf },
    });

    return cpfCount > 0;
  }

  public async hasByEmail(email: string): Promise<boolean> {
    const emailCount = await this.prismaService.customer.count({
      where: { email },
    });

    return emailCount > 0;
  }
  public async hasByUsername(username: string): Promise<boolean> {
    const usernameCount = await this.prismaService.customer.count({
      where: { username },
    });

    return usernameCount > 0;
  }

  public async save(user: User): Promise<void> {
    await this.prismaService.customer.create({
      data: {
        cpf: user.cpf.cpf,
        email: user.email.value,
        id: user.id.id,
        password: user.hashedPassword,
        username: user.username.value,
        name: user.name,
      },
    });
  }
}
