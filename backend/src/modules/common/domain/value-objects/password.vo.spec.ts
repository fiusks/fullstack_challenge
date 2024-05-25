import { Password } from './password.vo';

describe('Password', () => {
  test('should create a new Password instance with a valid password', () => {
    const password = 'password123';
    const passwordObj = Password.create(password);
    expect(passwordObj).toBe(password);
  });

  test('should throw an error with an invalid password', () => {
    const invalidPassword = 'short';
    expect(() => Password.create(invalidPassword)).toThrow();
  });
});
