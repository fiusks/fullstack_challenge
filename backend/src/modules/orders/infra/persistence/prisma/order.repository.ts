import { PrismaClient } from '@prisma/client';
import { OrderRepository } from 'src/modules/orders/domain';
import { PrismaOrderModel } from './order.model';
import { Order } from 'src/modules/orders/domain/entities/order.entity';
import { OrderItem } from 'src/modules/orders/domain/entities/order-item.entity';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaOrder: PrismaOrderModel): Order {
    const items = prismaOrder.productOrders.map((productOrder: any) => {
      return OrderItem.create({
        id: productOrder.id,
        amount: productOrder.quantity,
        price: productOrder.price,
        productId: productOrder.pro,
        productName: productOrder.product.name,
        createdAt: productOrder.createdAt,
        updatedAt: productOrder.updatedAt,
      });
    });

    return Order.create({
      id: prismaOrder.id,
      items: items,
      orderDate: prismaOrder.date,
      createdAt: prismaOrder.createdAt,
      updatedAt: prismaOrder.updatedAt,
    });
  }

  public async save(input: Order): Promise<Order> {
    const order = await this.prismaService.order.create({
      data: {
        id: input.id.id,
        customerId: '',
        status: false,
        totalValue: input.total,
        productOrders: {
          createMany: {
            data: input.items.map((item) => ({
              id: item.id.id,
              quantity: item.amount.value,
              price: item.price,
              productId: item.product.id.id,
            })),
          },
        },
      },
      include: {
        productOrders: {
          include: {
            product: true,
          },
        },
      },
    });
    // order.productOrders[0].product.

    return this.convert(order);
  }

  public async findByCustomerId(customerId: string): Promise<Order[]> {
    const prismaOrders = await this.prismaService.order.findMany({
      where: { customerId },
    });
    // convert
    return [];
  }

  public async findById(id: string): Promise<Order | null> {
    const prismaOrder = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (!prismaOrder) return null;

    // convert
    return null;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.order.delete({ where: { id } });
  }
}
