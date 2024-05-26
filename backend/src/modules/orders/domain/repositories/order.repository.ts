import { Order } from '../entities';

export interface OrderRepository {
  create(input: Order.CreateProps): Promise<Order>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByCustomerId(id: string): Promise<Order | null>;
}
