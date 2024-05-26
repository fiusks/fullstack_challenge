import {  GetUser } from "../../domain/usecases/get-user";
import { User } from "../../domain";
import { HttpClient } from "@/modules/common";

export class GetUserGateway implements GetUser{
    constructor(private readonly httpClient:HttpClient){}

    public async execute(id:string):Promise<User>{
        const endpoint = 'user'

        const products = await this.httpClient(`http://localhost:3334/${endpoint}/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        return  products.json()
    }
}