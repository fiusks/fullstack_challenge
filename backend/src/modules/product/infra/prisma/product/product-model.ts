import { PrismaCategoryModel } from '../category';

export interface PrismaProductModel {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  enabled: boolean;
  price: number;
  stockQuantity: number;
  registrationDate: Date;
  image: string;
  category: PrismaCategoryModel;
  createdAt: Date;
  updatedAt: Date;
}
