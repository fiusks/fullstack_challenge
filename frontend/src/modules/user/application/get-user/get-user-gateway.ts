import { HttpClient } from "@/modules/lorem";
import {  GetUser } from "../../domain/usecases/get-user";
import { User } from "../../domain";


export class GetUserGateway implements GetUser{
    constructor(private readonly httpClient:HttpClient){}

    public async execute(id:string):Promise<User>{
        const endpoint = 'user'

        const products = await fetch(`http://localhost:3334/${endpoint}/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        return  products.json()
    }
}