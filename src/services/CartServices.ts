import type { MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Store } from 'vuex';
import type { Cart } from '@/entity/Cart';

export default class CartServices {
  private static readonly baseUrl = 'carrinho/';

  static async getAll(store: Store<MainState>): Promise<Cart[]> {
    return await AxiosAdapter.get(this.baseUrl + 'obterTodasCompras', store);
  }

  static async getByIdClient(idClient: number, store: Store<MainState>): Promise<Cart[]> {
    return await AxiosAdapter.get(this.baseUrl + 'obterTodasComprasCliente/' + idClient, store);
  }
}
