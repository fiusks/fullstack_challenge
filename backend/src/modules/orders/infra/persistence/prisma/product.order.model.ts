// import { PrismaProductModel } from 'src/modules/product/infra';

import { PrismaProductModel } from 'src/modules/product/infra';

export interface PrismaProducOrder {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  orderId: string;
  product: PrismaProductModel;
  order: PrismaProducOrder;
  createdAt: Date;
  updatedAt: Date;
}
