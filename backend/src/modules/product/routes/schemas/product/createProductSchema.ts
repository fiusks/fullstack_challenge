export const createProductSchema = {
  type: 'object',
  required: [
    'name',
    'description',
    'enabled',
    'price',
    'stockQuantity',
    'image',
    'categoryId',
  ],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    enabled: { type: 'boolean' },
    price: { type: 'number' },
    stockQuantity: { type: 'number' },
    image: { type: 'string' },
    categoryId: { type: 'string' },
  },
};
