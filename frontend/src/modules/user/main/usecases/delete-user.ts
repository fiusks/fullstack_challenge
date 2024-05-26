import { fetchHttpClient } from "@/modules/common";
import {  DeleteUserGateway } from "../../application";
import { DeleteUser } from "../../domain/usecases";

export function deleteuser(): DeleteUser {
    return new DeleteUserGateway(fetchHttpClient);
}
