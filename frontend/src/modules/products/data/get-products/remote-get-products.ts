import { HttpClient } from "@/modules/common";
import { GetProducts, Product } from "../../domain";

export class RemoteGetProducts implements GetProducts{
    constructor(private readonly httpClient:HttpClient){}
    
    public async execute(): Promise<Product[]> {
        const endpoint = 'product'

        const products = await this.httpClient(`http://localhost:3333/${endpoint}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        return  await products.json()
    }
}