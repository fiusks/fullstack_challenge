// src/lib/FetchHttpClient.ts

import { HttpClient } from "./common/domain/http-client";


export const fetchHttpClient: HttpClient = async (input, init) => {
    const response = await fetch(input, init);
    if (!response.ok) {
        //@ts-ignore
        throw new Error(response.status);
    }
    return response;
};
