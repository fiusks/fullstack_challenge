import { CreateUserDto } from "../dtos";
import { User } from "../models/user";

export interface CreateUser{
    execute(input:CreateUserDto):Promise<User>
}