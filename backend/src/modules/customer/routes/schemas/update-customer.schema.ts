export const updateCustomerSchema = {
  type: 'object',
  required: ['email', 'password', 'name', 'cpf', 'id'],
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    cpf: { type: 'string' },
    phone: { type: 'string' },
    birthday: { type: 'string' },
  },
};
