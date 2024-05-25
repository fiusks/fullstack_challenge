import { CPF } from './cpf.vo';

describe('CPF', () => {
  test('should create a new CPF instance with a valid CPF number', () => {
    const cpf = '64551379069';
    const cpfObj = CPF.create(cpf);
    expect(cpfObj.cpf).toBe(cpf);
  });

  test('should throw an error with an invalid CPF number', () => {
    const invalidCPF = '123';
    expect(() => CPF.create(invalidCPF)).toThrow();
  });
});
