export const deleteCustomerAddressSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
};
