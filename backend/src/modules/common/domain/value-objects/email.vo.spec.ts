import { Email } from './email.vo';

describe('Email', () => {
  test('should create a new Email instance with a valid email address', () => {
    const email = 'test@example.com';
    const emailObj = Email.create(email);
    expect(emailObj).toBe(email);
  });

  test('should throw an error with an invalid email address', () => {
    const invalidEmail = 'invalid_email';
    expect(() => Email.create(invalidEmail)).toThrow();
  });
});
