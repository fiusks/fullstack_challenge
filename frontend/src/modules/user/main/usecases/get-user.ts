import { fetchHttpClient } from "@/modules/common";
import { GetUserGateway } from "../../application";
import { GetUser } from "../../domain/usecases";

export function getUser(): GetUser {
    return new GetUserGateway(fetchHttpClient);
}
