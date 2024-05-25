export interface Hash {
  make(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
