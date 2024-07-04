import type { MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Store } from 'vuex';
import type { AboutUs } from '@/entity/AboutUs';

export default class AboutUsServices {
  private static readonly baseUrl = 'sobre-nos/';

  static async getAll(store: Store<MainState>): Promise<AboutUs[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }

  static async update(data: AboutUs, store: Store<MainState>): Promise<AboutUs> {
    return await AxiosAdapter.put(this.baseUrl + data.id, store, data);
  }
}
