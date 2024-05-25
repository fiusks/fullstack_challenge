export const createCustomerSchema = {
  type: 'object',
  required: ['email', 'username', 'password', 'name', 'cpf'],
  properties: {
    email: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    cpf: { type: 'string' },
    phone: { type: 'string' },
    birthday: { type: 'string' },
  },
};
