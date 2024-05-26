import { HttpClient } from "@/modules/lorem";
import { DeleteUser } from "../../domain/usecases/delete-user";


export class DeleteUserGateway implements DeleteUser{
    constructor(private readonly httpClient:HttpClient){}

    public async execute(id:string):Promise<void>{
        const endpoint = 'user'

        const products = await this.httpClient(`http://localhost:3334/${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

        return  products.json()
    }
}