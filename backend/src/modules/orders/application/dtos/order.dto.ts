import { Order } from '../../domain';

export class OrderDto {
  public readonly id: string;

  constructor(order: Order) {
    this.id = order.id.id;
  }
}
