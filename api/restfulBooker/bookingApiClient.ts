import { APIRequestContext } from '@playwright/test';

export type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
};

export class BookingApiClient {
  private token: string | null = null;

  constructor(private request: APIRequestContext) {}

  async authenticate(username: string, password: string) {
    const res = await this.request.post('/auth', { data: { username, password } });
    const body = await res.json();
    this.token = body.token;
  }

  async createBooking(payload: BookingPayload) {
    return this.request.post('/booking', { data: payload });
  }

  async getBooking(id: number) {
    return this.request.get(`/booking/${id}`);
  }

  async updateBooking(id: number, payload: BookingPayload) {
    return this.request.put(`/booking/${id}`, {
      data: payload,
      headers: { Cookie: `token=${this.token}` },
    });
  }

  async deleteBooking(id: number) {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${this.token}` },
    });
  }
}
