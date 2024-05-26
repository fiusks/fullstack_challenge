import { PrismaCustomerAddress } from '~/modules/customerAddress';

export interface PrismaCustomer {
  id: string;
  username: string;
  cpf: string;
  email: string;
  address: PrismaCustomerAddress | null;
  name: string;
  password: string;
  phone: string | null;
  birthdate: Date | null;
}
