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
    private readonly customerRepository: CustomerRepository,
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

    const orderItems = input.items.map((item) => {
      const product = products.find((product) =>
        product.id.equals(EntityId.create(item.productId)),
      )!;
      return OrderItem.create({
        product,
        amount: item.amount,
      });
    });

    orderItems.forEach((item) => {
      item.product.decreaseStock(item.amount.value);
    });

    const order = Order.create({
      customer,
      orderDate: new Date(),
      items: orderItems,
    });

    await this.orderRepository.save(order);
    return new OrderDto(order);
  }
}
