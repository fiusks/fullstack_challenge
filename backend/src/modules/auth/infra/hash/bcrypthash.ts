import * as bcrypt from 'bcrypt';
import { Hash } from '../../application/interfaces/hash';

export class BcryptHash implements Hash {
  async make(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
