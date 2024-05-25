import { User } from '../entities';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  hasByEmail(email: string): Promise<boolean>;
  hasByCpf(cpf: string): Promise<boolean>;
  hasByUsername(username: string): Promise<boolean>;
  save(user: User): Promise<void>;
}
