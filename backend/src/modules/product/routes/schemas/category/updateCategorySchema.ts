export const updateCategorySchema = {
  type: 'object',
  required: ['name', 'description', 'id'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
  },
};
