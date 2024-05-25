import { v4 as uuidv4 } from 'uuid';

import { Product } from './product.entity';

describe('Product Entity', () => {
  const validProps: Product.CreateProps = {
    category: {
      name: 'Nova Categoria',
      description: 'Categoria de teste',
      enabled: true,
    },
    name: 'Test Product',
    description: 'Test Description',
    enabled: true,
    price: 100,
    stockQuantity: 50,
    image: 'test-image.jpg',
  };

  it('should create a new Product instance with valid properties', () => {
    const product = Product.create(validProps);

    expect(product.name).toBe(validProps.name);
    expect(product.description).toBe(validProps.description);
    expect(product.price).toBe(validProps.price);
    expect(product.stockQuantity).toBe(validProps.stockQuantity);
    expect(product.image).toBe(validProps.image);
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.updatedAt).toBeInstanceOf(Date);
  });

  it('should update the product properties', () => {
    const product = Product.create(validProps);
    const updatedProps = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 200,
      stockQuantity: 100,
      image: 'updated-image.jpg',
      category: {
        name: 'Outra Categoria',
        description: 'Categoria de teste 2',
      },
    };

    product.update(updatedProps);

    expect(product.name).toBe(updatedProps.name);
    expect(product.description).toBe(updatedProps.description);
    expect(product.price).toBe(updatedProps.price);
    expect(product.stockQuantity).toBe(updatedProps.stockQuantity);
    expect(product.image).toBe(updatedProps.image);
  });

  it('should increase the product stock', () => {
    const product = Product.create(validProps);
    product.increaseStock(10);

    expect(product.stockQuantity).toBe(validProps.stockQuantity + 10);
  });

  it('should decrease the product stock', () => {
    const product = Product.create(validProps);
    product.decreaseStock(10);

    expect(product.stockQuantity).toBe(validProps.stockQuantity - 10);
  });

  it('should throw an error when decreasing stock below zero', () => {
    const product = Product.create(validProps);

    expect(() => product.decreaseStock(validProps.stockQuantity + 1)).toThrow(
      'Insufficient stock',
    );
  });

  it('should check equality of two products', () => {
    const product1 = Product.create(validProps);
    const product2 = Product.create({ ...validProps, id: uuidv4() });

    expect(product1.equals(product1)).toBe(true);
    expect(product1.equals(product2)).toBe(false);
  });
});
