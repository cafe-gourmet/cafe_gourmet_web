import AxiosAdapter from '@/config/AxiosAdapter';
import type { MainState } from '@/config/MainStore';
import type Contact from '@/entity/Contact';
import type { Store } from 'vuex';

export default class ContactServices {
  private static readonly baseUrl = 'contato/';

  static async getAll(store: Store<MainState>): Promise<Contact[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }

  static async update(data: Contact, store: Store<MainState>): Promise<Contact> {
    return await AxiosAdapter.put(this.baseUrl, store, data);
  }
}
