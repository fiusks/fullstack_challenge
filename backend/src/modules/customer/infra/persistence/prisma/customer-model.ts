import { PrismaCustomerAddress } from 'src/modules/customerAddress';

export interface PrismaCustomer {
  id: string;
  username: string;
  cpf: string;
  email: string;
  addresses: PrismaCustomerAddress[];
  name: string;
  password: string;
  phone?: string;
  birthdate?: Date;
}
