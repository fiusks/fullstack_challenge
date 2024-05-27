import { UserDto } from '~/modules/auth/application';
import { Order, OrderItem, OrderRepository } from '../../domain';
import { CreateOrderDto, OrderDto } from '../dtos';
import { ProductRepository } from '~/modules/product';
import {
  EntityId,
  notFoundError,
  unprocessableEntityError,
} from '~/modules/common/domain';
import { CustomerRepository } from '~/modules/customer';

export class CheckoutService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    public readonly customerRepository: CustomerRepository,
  ) {}

  public async execute(
    input: CreateOrderDto,
    user: UserDto,
  ): Promise<OrderDto> {
    const productsIds = new Set(input.items.map((item) => item.productId));

    if (productsIds.size !== input.items.length) {
      throw unprocessableEntityError('Duplicated products in the order');
    }

    // TODO rename to findByIds
    const products = await this.productRepository.findByIds(
      Array.from(productsIds),
    );
    const allProductsExists = productsIds.size === products.length;
    if (!allProductsExists) {
      throw notFoundError('Some products do not exist');
    }

    const hasEnoughStock = products.every((product) => {
      const item = input.items.find((item) =>
        product.id.equals(EntityId.create(item!.productId)),
      );
      return product.stockQuantity >= item!.amount;
    });
    if (!hasEnoughStock) {
      throw unprocessableEntityError('Some products do not have enough stock');
    }

    const customer = await this.customerRepository.findById(user.id);
    if (!customer) {
      throw notFoundError('Customer not found');
    }
    if (!customer.address) {
      throw unprocessableEntityError(
        'Customer has no address. Please add one before proceeding with the order',
      );
    }

    // TODO create mapper
    const orderItems = [] as OrderItem.CreateProps[];
    const order = Order.create({
      customer,
      orderDate: new Date(),
      items: orderItems,
    });

    await this.orderRepository.save(order);
    return new OrderDto(order);
  }
}
