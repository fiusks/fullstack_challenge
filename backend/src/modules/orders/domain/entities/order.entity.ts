import z from 'zod';

import { BaseEntity } from '~/modules/common/domain';
import { OrderItem } from './order-item.entity';
import { Customer } from '~/modules/customer';

export class Order extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      customer: z.instanceof(Customer),
      items: z.array(z.instanceof(OrderItem)).min(1),
      orderDate: z.date(),
    });
  }

  public static create(props: Order.CreateProps): Order {
    return new Order(Order.validator.parse(props));
  }

  public toJSON(): Order.JSON {
    return {
      id: this.id.toJSON(),
      items: this.items.map((item) => item.toJSON()),
      total: this.total,
      orderDate: this.createdAt,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  public get items(): ReadonlyArray<OrderItem> {
    return [...this.#items];
  }

  public get total(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  constructor(props: Order.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#items = props.items;
  }

  readonly #items: OrderItem[];
}

export namespace Order {
  export type CreateProps = BaseEntity.CreateProps & {
    items: OrderItem[];
    customer: Customer;
    orderDate: Date;
  };

  export type Props = BaseEntity.Props & {
    items: OrderItem[];
    orderDate: Date;
    customer: Customer;
  };

  export type JSON = BaseEntity.JSON & {
    items: OrderItem.JSON[];
    total: number;
    orderDate: Date;
  };
}
