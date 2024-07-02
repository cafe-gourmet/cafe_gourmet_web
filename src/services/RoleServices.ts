import AxiosAdapter from '@/config/AxiosAdapter';
import type { MainState } from '@/config/MainStore';
import type { Role } from '@/entity/Role';
import type { Store } from 'vuex';

export default class RoleServices {
  private static readonly baseUrl = 'cargo/';

  static async getAll(store: Store<MainState>): Promise<Role[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }
}
