import { HttpClient } from "@/modules/common";

import { CreateUserDto, User } from "../../domain";
import { CreateUser } from "../../domain/usecases/create-user";


export class CreateUserGateway implements CreateUser{
    constructor(private readonly httpClient:HttpClient){}

    public async execute(input:CreateUserDto):Promise<User>{
        const endpoint = 'user'

        const products = await this.httpClient(`http://localhost:3334/${endpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(input)
          });

        return  products.json()
    }
}