import { GetProducts, Product } from "../../domain";

export class RemoteGetProducts implements GetProducts{
    
    public async execute(): Promise<Product[]> {
        const endpoint = '/products'

        const products = await fetch(`http://localhost:3333/${endpoint}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
           
          });

        return products.json()
    }
}