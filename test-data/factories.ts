import { faker } from '@faker-js/faker';

export function createRandomCustomer() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
  };
}
