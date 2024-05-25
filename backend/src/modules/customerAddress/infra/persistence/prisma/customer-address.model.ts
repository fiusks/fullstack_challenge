export interface PrismaCustomerAddress {
  id: string;
  customerId: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  complement: string | null;
  number: string;
  street: string;
  state: string;
}
