export interface HttpClient {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
}
