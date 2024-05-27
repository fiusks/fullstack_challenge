import { Decimal } from '@prisma/client/runtime/library';
import { PrismaProducOrder } from './product.order.model';

export interface PrismaOrderModel {
  id: string;
  totalValue: Decimal;
  date: Date;
  status: boolean;
  customerId: string;
  productOrders: PrismaProducOrder[];
  createdAt: Date;
  updatedAt: Date;
}
