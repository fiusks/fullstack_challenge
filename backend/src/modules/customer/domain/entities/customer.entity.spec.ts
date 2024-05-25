import { Customer } from './customer.entity';

describe('Customer', () => {
  let validProps: Customer.CreateProps;

  beforeEach(() => {
    validProps = {
      email: 'test@example.com',
      username: 'test_user',
      password: 'password123',
      name: 'Test User',
      cpf: '64551379069',
      phone: '71988815894',
      birthday: new Date('1990-01-01'),
    };
  });

  describe('create', () => {
    test('should create a new customer instance with valid props', () => {
      const customer = Customer.create(validProps);
      expect(customer).toBeInstanceOf(Customer);
    });

    test('should throw an error when creating with invalid props', () => {
      expect(() =>
        Customer.create({ ...validProps, email: 'invalid_email' }),
      ).toThrow();
    });
  });

  describe('updateProfile', () => {
    test('should update profile properties with valid props', () => {
      const customer = Customer.create(validProps);
      const updatedProps = {
        email: 'updated@example.com',
        password: 'updated_password123',
        name: 'Updated User',
        cpf: '64551379069',
        phone: '71988815893',
        birthday: new Date('2000-01-01'),
      };
      customer.updateProfile(updatedProps);
      expect(customer.email.toJSON()).toBe(updatedProps.email);
      expect(customer.password.toJSON()).toBe(updatedProps.password);
      expect(customer.name).toBe(updatedProps.name);
      expect(customer.cpf.toJSON()).toBe(updatedProps.cpf);
      expect(customer.phone).toBe(updatedProps.phone);
      expect(customer.birthday).toEqual(updatedProps.birthday);
    });

    test('should throw an error with invalid props', () => {
      const customer = Customer.create(validProps);
      const invalidProps = { email: 'invalid_email' };
      expect(() => customer.updateProfile(invalidProps)).toThrow();
    });
  });
});
