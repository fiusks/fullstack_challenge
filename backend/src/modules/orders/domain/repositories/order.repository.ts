import { Order } from '../entities';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByCustomerId(id: string): Promise<Order[]>;
}
