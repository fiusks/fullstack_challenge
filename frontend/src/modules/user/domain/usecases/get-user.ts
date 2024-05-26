import { User } from "../models/user";

export interface GetUser{
    execute(id:string):Promise<User>
}