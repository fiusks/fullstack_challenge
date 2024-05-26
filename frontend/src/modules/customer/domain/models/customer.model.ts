import { Address } from "./address.model";

export interface Customer{
    id: string
    email: string
    username: string;
    password: string
    name: string;
    cpf: string
    phone: string | null;
    birthday: Date | null;
    address: Address
    createdAt: Date;
    updatedAt: Date;
}