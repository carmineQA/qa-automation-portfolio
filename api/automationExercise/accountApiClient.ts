import { APIRequestContext } from '@playwright/test';

export type AutomationExerciseAccount = {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  birthDate: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobileNumber: string;
};

export class AccountApiClient {
  constructor(private request: APIRequestContext) {}

  async createAccount(account: AutomationExerciseAccount) {
    return this.request.post('/api/createAccount', {
      form: {
        name: account.name,
        email: account.email,
        password: account.password,
        title: account.title,
        birth_date: account.birthDate,
        birth_month: account.birthMonth,
        birth_year: account.birthYear,
        firstname: account.firstName,
        lastname: account.lastName,
        company: account.company,
        address1: account.address1,
        address2: account.address2,
        country: account.country,
        zipcode: account.zipcode,
        state: account.state,
        city: account.city,
        mobile_number: account.mobileNumber,
      },
    });
  }

  async deleteAccount(email: string, password: string) {
    return this.request.delete('/api/deleteAccount', {
      form: { email, password },
    });
  }
}
