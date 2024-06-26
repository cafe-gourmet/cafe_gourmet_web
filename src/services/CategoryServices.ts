import type { AuthState } from '@/config/AuthStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Category } from '@/entity/Category';
import type { Store } from 'vuex';

export default class CategoryServices {
  private static readonly baseUrl = 'categoria/';

  static async getAll(store: Store<AuthState>): Promise<Category[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }

  static async add(category: Category, store: Store<AuthState>): Promise<Category> {
    return await AxiosAdapter.post(this.baseUrl, store, category);
  }

  static async edit(category: Category, store: Store<AuthState>): Promise<Category> {
    return await AxiosAdapter.put(this.baseUrl + category.id, store, category);
  }

  static async delete(categoryId: number, store: Store<AuthState>): Promise<Category> {
    return await AxiosAdapter.delete(this.baseUrl + categoryId, store);
  }
}
