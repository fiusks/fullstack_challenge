export const updateCustomerAddressSchema = {
  type: 'object',
  required: [
    'zipCode',
    'street',
    'neighborhood',
    'city',
    'number',
    'complement',
    'state',
  ],
  properties: {
    street: { type: 'string' },
    city: { type: 'string' },
    zipCode: { type: 'string' },
    customerId: { type: 'string' },
    neighborhood: { type: 'string' },
    number: { type: 'string' },
    complement: { type: 'string' },
    state: { type: 'string' },
  },
};
