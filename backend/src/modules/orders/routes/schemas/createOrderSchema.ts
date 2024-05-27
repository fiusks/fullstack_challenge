export const createOrderSchema = {
  type: 'object',
  required: ['items'],
  properties: {
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['productId', 'amount'],
        properties: {
          productId: { type: 'string' },
          amount: { type: 'number' },
        },
      },
    },
  },
};
