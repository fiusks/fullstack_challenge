import { BaseEntity } from '~/modules/common/domain';
import { Product } from '~/modules/product';
import { OrderItemAmount } from '../value-objects';

export class OrderItem extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      product: Product.validator.transform((props) => new Product(props)),
      amount: OrderItemAmount.validator.transform(
        (amount) => new OrderItemAmount(amount),
      ),
    });
  }

  public static create(props: OrderItem.CreateProps): OrderItem {
    return new OrderItem(OrderItem.validator.parse(props));
  }

  public toJSON(): OrderItem.JSON {
    return {
      id: this.id.toJSON(),
      product: this.product.toJSON(),
      amount: this.amount.toJSON(),
      createdAt: this.createdAt.toJSON(),
      updatedAt: this.updatedAt.toJSON(),
    };
  }

  public get price(): number {
    // TODO use BigDecimal
    return this.product.price * this.amount.value;
  }

  public get product(): Product {
    return this.#product;
  }

  public get amount(): OrderItemAmount {
    return this.#amount;
  }

  constructor(props: OrderItem.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#product = props.product;
    this.#amount = props.amount;
  }

  readonly #product: Product;
  readonly #amount: OrderItemAmount;
}

export namespace OrderItem {
  export type CreateProps = BaseEntity.CreateProps & {
    product: Product.CreateProps;
    amount: number;
  };

  export type Props = BaseEntity.Props & {
    product: Product;
    amount: OrderItemAmount;
  };

  export type JSON = BaseEntity.JSON & {
    product: Product.JSON;
    amount: OrderItemAmount.JSON;
  };
}
