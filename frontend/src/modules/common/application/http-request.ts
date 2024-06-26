import { HttpClient } from "../domain";

const baseURL = "http://localhost:3333/";

export const fetchHttpClient: HttpClient = async (url, init) => {
  const _url = url instanceof URL ? url : new URL(url, baseURL);
  const headers = new Headers(init?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(_url, { ...init, headers });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

let accessToken = "";

export const fetchHttpClientWithToken: HttpClient = async (url, init) => {
  const headers = new Headers(init?.headers);

  if (!headers.has("Authorization") && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetchHttpClient(url, { ...init, headers });
};

export const setHttpClientToken = (token: string) => {
  accessToken = token;
};
