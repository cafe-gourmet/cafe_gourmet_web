import type { AuthState } from '@/config/AuthStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Product } from '@/entity/Product';
import type { Store } from 'vuex';

export default class CategoryServices {
  private static readonly baseUrl = 'categoria/';

  static async getAll(store: Store<AuthState>): Promise<Product[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }
}
