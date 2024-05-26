export interface Address{
    id: string;
    customerId: string;
    zipCode: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    complement: string | null;
    state: string;
    createdAt: string;
    updatedAt: string;
}