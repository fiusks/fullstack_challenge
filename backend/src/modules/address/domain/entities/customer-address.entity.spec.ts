import { v4 as uuidv4 } from 'uuid';

import { CustomerAddress } from './customer-address.entity';

describe('CustomerAddress', () => {
  describe('create', () => {
    it('should create a new CustomerAddress instance with valid properties', () => {
      const props: CustomerAddress.CreateProps = {
        customerId: uuidv4(),
        zipCode: '12345',
        street: 'Main St',
        neighborhood: 'Downtown',
        city: 'Metropolis',
        number: '123',
        complement: 'Apt 101',
        state: 'NY',
      };

      const address = CustomerAddress.create(props);

      expect(address).toBeInstanceOf(CustomerAddress);
      expect(address.id).toBeDefined();
      expect(address.customerId.id).toEqual(props.customerId);
      expect(address.zipCode).toEqual(props.zipCode);
      expect(address.street).toEqual(props.street);
      expect(address.neighborhood).toEqual(props.neighborhood);
      expect(address.city).toEqual(props.city);
      expect(address.number).toEqual(props.number);
      expect(address.complement).toEqual(props.complement);
      expect(address.state).toEqual(props.state);
      expect(address.createdAt).toBeDefined();
      expect(address.updatedAt).toBeDefined();
    });
  });

  describe('updateProfile', () => {
    it('should update address properties with provided values', () => {
      const initialProps = {
        customerId: uuidv4(),
        zipCode: '12345',
        street: 'Main St',
        neighborhood: 'Downtown',
        city: 'Metropolis',
        number: '123',
        complement: 'Apt 101',
        state: 'NY',
      };

      const address = CustomerAddress.create(initialProps);

      const updatedProps = {
        city: 'New City',
        street: 'Updated St',
        number: '456',
      };

      address.updateProfile(updatedProps);

      expect(address.city).toEqual(updatedProps.city);
      expect(address.street).toEqual(updatedProps.street);
      expect(address.number).toEqual(updatedProps.number);
      // Ensure other properties was unchanged
      expect(address.zipCode).toEqual(initialProps.zipCode);
      expect(address.neighborhood).toEqual(initialProps.neighborhood);
      expect(address.complement).toEqual(initialProps.complement);
      expect(address.state).toEqual(initialProps.state);
    });
  });
});
