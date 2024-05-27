import { HttpClient } from '../domain';

const baseURL = 'http://localhost:3333/';

export const fetchHttpClient: HttpClient = async (url, init) => {
  const _url = url instanceof URL ? url : new URL(url, baseURL);
  const headers = new Headers(init?.headers);

  if(!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(_url, { ...init, headers });

  if (!response.ok) {
    //@ts-ignore
    throw new Error(response.status);
  }

  return response;
};

export const fetchHttpClientWithToken: HttpClient = async (url, init) => {
  // const token = localStorage.getItem('token');
  const token = ""
  const headers = new Headers(init?.headers);

  if (!headers.has('Authorization') && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetchHttpClient(url, { ...init, headers });
};
