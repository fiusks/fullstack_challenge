export const createCategorySchema = {
  type: 'object',
  required: ['name', 'description', 'enabled'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    enabled: { type: 'boolean' },
  },
};
