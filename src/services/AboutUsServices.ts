import type { MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Store } from 'vuex';
import type { AboutUs } from '@/entity/AboutUs';

export default class CategoryServices {
  private static readonly baseUrl = 'sobre-nos/';

  static async getAll(store: Store<MainState>):Promise<AboutUs[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }
}
