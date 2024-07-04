import type { CartStore, MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Store } from 'vuex';
import { Cart } from '@/entity/Cart';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';

export default class CartServices {
  private static readonly baseUrl = 'carrinho/';

  static async getAll(store: Store<MainState>): Promise<Cart[]> {
    return await AxiosAdapter.get(this.baseUrl + 'obterTodasCompras', store);
  }

  static async getByIdClient(idClient: number, store: Store<MainState>): Promise<Cart[]> {
    return await AxiosAdapter.get(this.baseUrl + 'obterTodasComprasCliente/' + idClient, store);
  }

  static async createCart(store: Store<MainState>) {
    const cartStore = store.getters.getCart;
    const idClient = store.getters.getAuthUser.cliente.id;
    const cartRequest: Cart[] = this.createCartListFromCartStore(cartStore, idClient);
    return await AxiosAdapter.post(this.baseUrl + 'adicionar', store, cartRequest);
  }

  static async cancelShopping(cartId: number, store: Store<MainState>) {
    return await AxiosAdapter.put(this.baseUrl + 'cancelarCompra/' + cartId, store);
  }

  static async confirmShopping(cartId: number, store: Store<MainState>) {
    return await AxiosAdapter.put(this.baseUrl + 'confirmarCompra/' + cartId, store);
  }

  private static createCartListFromCartStore(cartStore: CartStore, idClient: number): Cart[] {
    const cartList: Cart[] = [];

    cartStore.products.forEach((product: ProductResponseDTO) =>
      cartList.push(Cart.createFromProductResponseDTO(product, idClient))
    );

    if (cartStore.plan?.id) {
      cartList.push(Cart.createFromPlan(cartStore.plan, idClient));
    }

    return cartList;
  }
}
