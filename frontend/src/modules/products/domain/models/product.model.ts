import { Category } from "./category.model";

export interface Product {   
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    price: number;
    stockQuantity: number;
    image: string;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
  };