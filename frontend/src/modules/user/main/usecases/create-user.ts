import { fetchHttpClient } from "@/modules/common";
import { CreateUserGateway } from "../../application";

export function createUser(): CreateUserGateway {
    return new CreateUserGateway(fetchHttpClient);
}
