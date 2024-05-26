import { User } from "../models/user";

export interface CreateUser{
    execute():Promise<User>
}