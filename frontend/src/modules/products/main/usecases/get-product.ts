import { RemoteGetProducts } from "../../data";
import { GetProducts } from "../../domain";

export function makeGetProducts(): GetProducts {
    return new RemoteGetProducts();
}
