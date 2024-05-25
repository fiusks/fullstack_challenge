import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(input: Order.CreateProps): Promise<Order>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByCustomerId(id: string): Promise<Order | null>;
}
